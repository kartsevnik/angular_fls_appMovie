const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

// Функция для получения HTML страницы
async function fetchHtml(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Ошибка запроса: ${error.message}`);
    }
}

// Функция для поиска фильмов
async function searchFilms(query) {
    const searchUrl = `https://rezka.ag/search/?do=search&subaction=search&q=${encodeURIComponent(query)}`;
    const html = await fetchHtml(searchUrl);
    const $ = cheerio.load(html);
    const results = [];

    $('div.b-content__inline_item-link a').each((index, element) => {
        results.push({
            title: $(element).text().trim(),
            url: $(element).attr('href')
        });
    });
    return results;
}

// Функция для получения информации о фильме
async function getFilmDetails(url) {
    const html = await fetchHtml(url);
    const $ = cheerio.load(html);

    const title = $('h1').text().trim();
    const thumbnail = $('meta[property="og:image"]').attr('content');
    const description = $('div.b-post__description_text').text().trim();

    return { title, thumbnail, description };
}

// Маршрут для поиска фильмов
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Требуется параметр запроса q' });
    try {
        const results = await searchFilms(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Маршрут для получения деталей фильма
app.get('/api/film', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Требуется параметр url' });
    try {
        const details = await getFilmDetails(url);
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
