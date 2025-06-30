const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Функция для выполнения HTTP-запроса и получения HTML
async function fetchHtml(url, proxy = null) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
      },
      timeout: 10000,
      proxy: proxy
    });
    console.info(`HTTP Status Code for URL ${url}: ${response.status}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    throw error;
  }
}

// Функция для парсинга списка фильмов из HTML с помощью Cheerio
function parseFilms(html) {
  const $ = cheerio.load(html);
  const films = [];

  // Попробуем несколько селекторов для поиска фильмов
  const selectors = [
    '.b-content__inline_item-link a',
    '.b-content__inline_item a',
    '.b-content__inline_item-link',
    '.b-content__inline_item',
    '.b-content__inline_item-cover a',
    '.b-content__inline_item-cover'
  ];

  let foundFilms = false;

  for (const selector of selectors) {
    $(selector).each((index, element) => {
      const $el = $(element);
      let filmUrl = $el.attr('href');
      let filmName = $el.text().trim();

      // Если это ссылка без текста, попробуем найти название в дочерних элементах
      if (!filmName) {
        filmName = $el.find('img').attr('alt') ||
          $el.find('.b-content__inline_item-title').text().trim() ||
          $el.find('.b-content__inline_item-link').text().trim();
      }

      // Если URL относительный, сделаем его абсолютным
      if (filmUrl && !filmUrl.startsWith('http')) {
        filmUrl = filmUrl.startsWith('/') ? `https://rezka.ag${filmUrl}` : `https://rezka.ag/${filmUrl}`;
      }

      if (filmUrl && filmName && !films.some(f => f.url === filmUrl)) {
        films.push({
          name: filmName,
          url: filmUrl,
          id: filmUrl.split('/').pop() || null
        });
        foundFilms = true;
      }
    });

    if (foundFilms) break;
  }

  console.log(`Found ${films.length} films using selectors`);
  return films;
}

// Функция для парсинга деталей фильма
function parseFilmDetails(html) {
  const $ = cheerio.load(html);

  const filmDetails = {
    name: '',
    originalName: '',
    year: '',
    country: '',
    genre: '',
    director: '',
    actors: '',
    description: '',
    rating: '',
    duration: '',
    poster: '',
    type: 'movie',
    seriesInfo: null,
    translators: [],
    playerHtml: ''
  };

  try {
    // Название фильма
    filmDetails.name = $('.b-post__title h1').text().trim() ||
      $('.b-post__title').text().trim() ||
      $('h1').text().trim();

    // Оригинальное название
    filmDetails.originalName = $('.b-post__origtitle').text().trim();

    // Год
    filmDetails.year = $('.b-post__info .item:contains("Год")').text().replace('Год:', '').trim();

    // Страна
    filmDetails.country = $('.b-post__info .item:contains("Страна")').text().replace('Страна:', '').trim();

    // Жанр
    filmDetails.genre = $('.b-post__info .item:contains("Жанр")').text().replace('Жанр:', '').trim();

    // Режиссер
    filmDetails.director = $('.b-post__info .item:contains("Режиссер")').text().replace('Режиссер:', '').trim();

    // Актеры
    filmDetails.actors = $('.b-post__info .item:contains("В ролях")').text().replace('В ролях:', '').trim();

    // Описание
    filmDetails.description = $('.b-post__description_text').text().trim();

    // Рейтинг
    filmDetails.rating = $('.b-post__rating').text().trim();

    // Длительность
    filmDetails.duration = $('.b-post__info .item:contains("Время")').text().replace('Время:', '').trim();

    // Постер
    filmDetails.poster = $('.b-post__cover img').attr('src') ||
      $('.b-post__cover img').attr('data-src') ||
      $('meta[property="og:image"]').attr('content');
    
    // Перевод
      $('#translators-list .b-translator__item').each((i, el) => {
        filmDetails.translators.push({
          name: $(el).text().trim(),
          translator_id: $(el).attr('data-translator_id'),
        });
      });

    // Тип (фильм/сериал)
    const typeText = $('.b-post__type').text().toLowerCase();
    if (typeText.includes('сериал') || typeText.includes('tv')) {
      filmDetails.type = 'tv_series';
    }

    // Информация о сериях (для сериалов)
    if (filmDetails.type === 'tv_series') {
      const seasons = [];
      $('.b-series__list .b-series__item').each((index, element) => {
        const $season = $(element);
        const seasonNumber = $season.find('.b-series__season').text().trim();
        const episodes = [];

        $season.find('.b-series__episode').each((epIndex, epElement) => {
          const $episode = $(epElement);
          episodes.push({
            number: $episode.find('.b-series__episode-number').text().trim(),
            title: $episode.find('.b-series__episode-title').text().trim(),
            url: $episode.attr('href')
          });
        });

        seasons.push({
          number: seasonNumber,
          episodes: episodes
        });
      });

      filmDetails.seriesInfo = { seasons };
    }

    // Парсинг переводов
    $('.b-translators__item').each((i, el) => {
      const $el = $(el);
      filmDetails.translators.push({
        id: $el.attr('data-id') || '',
        name: $el.text().trim()
      });
    });

    // Сохраняем html плеера
    filmDetails.playerHtml = $('#player').html() || '';

  } catch (error) {
    console.error('Error parsing film details:', error);
  }

  return filmDetails;
}

// Главная страница
app.get('/', (req, res) => {
  res.json({
    message: 'Express сервер работает!',
    endpoints: {
      '/api/film/trending': 'Трендовые фильмы',
      '/api/film/popular': 'Популярные фильмы',
      '/api/film/search?query=название': 'Поиск фильмов',
      '/api/film/all': 'Все фильмы',
      '/api/film?url=url_фильма': 'Детали фильма'
    }
  });
});

// Получение деталей фильма по URL
app.get('/api/film', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL обязателен' });
  }
  try {
    const html = await fetchHtml(url);
    const filmDetails = parseFilmDetails(html);

    // Сохраняем HTML для отладки (опционально)
    if (req.query.debug === 'true') {
      fs.writeFileSync('debug_film.html', html, 'utf8');
    }

    res.json(filmDetails);
  } catch (error) {
    console.error('Error in /api/film:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// Получение video
app.get('/api/film/player-html', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'URL обязателен' });

  try {
    const html = await fetchHtml(url);
    const $ = cheerio.load(html);
    const playerHtml = $('#player').html();
    res.json({ playerHtml });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});


// Получение трендовых фильмов
app.get('/api/film/trending', async (req, res) => {
  const page = req.query.page || 1;
  try {
    const trendingUrl = `https://rezka.ag/films/page/${page}/?filter=watching`;
    const html = await fetchHtml(trendingUrl);
    const results = parseFilms(html);
    console.info(`Found ${results.length} trending films on page ${page}`);
    res.json({ results, page: Number(page) });
  } catch (error) {
    console.error('Error in /api/film/trending:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// Получение популярных фильмов
app.get('/api/film/popular', async (req, res) => {
  const page = req.query.page || 1;
  try {
    const popularUrl = `https://rezka.ag/films/page/${page}/?filter=popular`;
    const html = await fetchHtml(popularUrl);
    const results = parseFilms(html);
    console.info(`Found ${results.length} popular films on page ${page}`);
    res.json({ results, page: Number(page) });
  } catch (error) {
    console.error('Error in /api/film/popular:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// Поиск фильмов по запросу
app.get('/api/film/search', async (req, res) => {
  const query = req.query.query;
  const page = req.query.page || 1;
  if (!query) {
    return res.status(400).json({ error: 'Параметр "query" обязателен' });
  }
  try {
    const encodedQuery = encodeURIComponent(query);
    const searchUrl = `https://rezka.ag/search/?do=search&subaction=search&q=${encodedQuery}&page=${page}`;
    const html = await fetchHtml(searchUrl);
    const results = parseFilms(html);
    console.info(`Found ${results.length} results for query "${query}" on page ${page}`);
    res.json({ results, page: Number(page) });
  } catch (error) {
    console.error('Error in /api/film/search:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// Получение всех фильмов
app.get('/api/film/all', async (req, res) => {
  const page = req.query.page || 1;
  try {
    const allFilmsUrl = `https://rezka.ag/films/page/${page}/`;
    const html = await fetchHtml(allFilmsUrl);
    const results = parseFilms(html);
    console.info(`Found ${results.length} films on page ${page}`);
    res.json({ results, page: Number(page) });
  } catch (error) {
    console.error('Error in /api/film/all:', error);
    res.status(500).json({ error: error.toString() });
  }
});

// Тестовый эндпоинт для проверки доступности сайта
app.get('/api/test', async (req, res) => {
  try {
    const html = await fetchHtml('https://rezka.ag/');
    res.json({
      status: 'success',
      message: 'Сайт доступен',
      htmlLength: html.length
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Сайт недоступен',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Тестовый эндпоинт: http://localhost:${PORT}/api/test`);
});