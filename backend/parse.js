const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

const fetchHtml = async (url) => {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept-Language': 'ru-RU,ru;q=0.9',
        }
    });
    return response.data;
};

const parseFilmDetails = async (html) => {
    const $ = cheerio.load(html);
    const name = $('.b-post__title h1').text().trim();
    const translators = [];

    $('#translators-list .b-translator__item').each((i, el) => {
        translators.push({
            id: $(el).attr('data-translator_id'),
            name: $(el).text().trim()
        });
    });

    // Ищем JS-переменную с id
    const htmlText = html.toString();
    const idMatch = htmlText.match(/playerParams\.id\s*=\s*(\d+);/);
    const id = idMatch ? idMatch[1] : null;

    return { name, translators, id };
};

const getStreamUrl = async (pageUrl, translationId, resolution = '720p') => {
    const html = await fetchHtml(pageUrl);
    const details = await parseFilmDetails(html);
    if (!details.id) throw new Error('ID фильма не найден');

    const formData = new URLSearchParams();
    formData.append('id', details.id);
    formData.append('translator_id', translationId);
    formData.append('is_camrip', 0);
    formData.append('is_ads', 0);
    formData.append('is_director', 0);

    const response = await axios.post(
        'https://rezka.ag/ajax/get_cdn_video/',
        formData.toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': pageUrl,
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0'
            }
        }
    );

    const file = response.data?.url || response.data?.file;
    if (!file || typeof file !== 'object') throw new Error('Ссылки не найдены');
    return file[resolution];
};

// ✅ Endpoint: Детали фильма (включая переводчиков)
app.get('/api/film', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'URL обязателен' });

    try {
        const html = await fetchHtml(url);
        const details = await parseFilmDetails(html);
        res.json(details);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// ✅ Endpoint: Получение ссылки на видео по переводу
app.get('/api/film/stream', async (req, res) => {
    const { url, translator_id, resolution } = req.query;
    if (!url || !translator_id) return res.status(400).json({ error: 'URL и translator_id обязательны' });

    try {
        const stream = await getStreamUrl(url, translator_id, resolution || '720p');
        res.json({ stream_url: stream });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// ✅ Endpoint: Все переводы + ссылки на стрим по каждому
app.get('/api/film/streams', async (req, res) => {
    const { url, resolution } = req.query;
    if (!url) return res.status(400).json({ error: 'URL обязателен' });

    try {
        const html = await fetchHtml(url);
        const details = await parseFilmDetails(html);
        const results = {};

        for (const tr of details.translators) {
            try {
                const stream = await getStreamUrl(url, tr.id, resolution || '720p');
                results[tr.name] = stream;
            } catch (err) {
                results[tr.name] = null;
            }
        }

        res.json({ stream_urls: results });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер работает на http://localhost:${PORT}`);
});
