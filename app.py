from flask import Flask, request, jsonify
from flask_cors import CORS
from HdRezkaApi import HdRezkaApi
import traceback
import logging
from urllib.parse import quote_plus

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Разрешает CORS для всех доменов. Настройте при необходимости.

# Инициализация HdRezkaApi (можно вынести в отдельный сервис)
def create_rezka_api(url, proxy=None):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                      'AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/81.0.4044.138 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Connection': 'keep-alive'
    }
    return HdRezkaApi(url, proxy=proxy, headers=headers)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Flask сервер работает!'}), 200

@app.route('/api/film', methods=['GET'])
def get_film_details():
    """
    Получение деталей фильма по URL.
    Параметры запроса:
    - url: URL фильма на rezka.ag
    """
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'URL обязателен'}), 400
    try:
        rezka = create_rezka_api(url)
        logger.info(f"Fetched details for URL: {url}")

        film_details = {
            'name': rezka.name,
            'thumbnail': rezka.thumbnail,
            'rating': {
                'value': rezka.rating.value,
                'votes': rezka.rating.votes
            },
            'translators': rezka.translators,
            'otherParts': rezka.otherParts,
            'type': str(rezka.type)  # Преобразуем type в строку
        }

        # Добавляем seriesInfo только для сериалов
        if str(rezka.type) == "tv_series":
            try:
                film_details['seriesInfo'] = rezka.seriesInfo
            except Exception as e:
                logger.error(f"Error fetching seriesInfo: {e}")
                film_details['seriesInfo'] = {}
        else:
            film_details['seriesInfo'] = {}

        return jsonify(film_details)
    except Exception as e:
        error_message = str(e)
        traceback_str = traceback.format_exc()
        logger.error(f"Error in /api/film: {error_message}\n{traceback_str}")
        return jsonify({'error': error_message}), 500

@app.route('/api/film/stream', methods=['GET'])
def get_film_stream():
    """
    Получение ссылки на стриминг фильма.
    Параметры запроса:
    - url: URL фильма на rezka.ag
    - resolution: желаемое разрешение (например, '720p')
    - season: номер сезона (опционально, для сериалов)
    - episode: номер серии (опционально, для сериалов)
    - translation: перевод или индекс переводчика (опционально)
    """
    url = request.args.get('url')
    resolution = request.args.get('resolution', '720p')
    season = request.args.get('season')
    episode = request.args.get('episode')
    translation = request.args.get('translation')

    if not url or not resolution:
        return jsonify({'error': 'URL и разрешение обязательны'}), 400
    try:
        rezka = create_rezka_api(url)
        logger.info(f"Fetching stream for URL: {url}, resolution: {resolution}")

        if str(rezka.type) == "movie":
            try:
                stream = rezka.getStream()(resolution)
                logger.info(f"Stream URL: {stream}")
                return jsonify({'stream_url': stream})
            except Exception as e:
                logger.error(f"Error getting stream for movie: {e}")
                return jsonify({'error': str(e)}), 500
        elif str(rezka.type) == "tv_series":
            if not season or not episode:
                return jsonify({'error': 'Для сериалов необходимо указать сезон и серию'}), 400
            try:
                stream = rezka.getStream(season, episode)(resolution)
                logger.info(f"Stream URL: {stream}")
                return jsonify({'stream_url': stream})
            except Exception as e:
                logger.error(f"Error getting stream for series: {e}")
                return jsonify({'error': str(e)}), 500
        else:
            logger.error(f"Undefined content type: {rezka.type}")
            return jsonify({'error': 'Неизвестный тип контента'}), 400
    except Exception as e:
        error_message = str(e)
        traceback_str = traceback.format_exc()
        logger.error(f"Error in /api/film/stream: {error_message}\n{traceback_str}")
        return jsonify({'error': error_message}), 500

@app.route('/api/film/streams', methods=['GET'])
def get_all_film_streams():
    """
    Получение ссылок на стриминг для всех переводов фильма.
    Параметры запроса:
    - url: URL фильма на rezka.ag
    - resolution: желаемое разрешение (например, '720p')
    """
    url = request.args.get('url')
    resolution = request.args.get('resolution', '720p')

    if not url or not resolution:
        return jsonify({'error': 'URL и разрешение обязательны'}), 400

    try:
        rezka = create_rezka_api(url)
        logger.info(f"Fetching streams for all translators for URL: {url}, resolution: {resolution}")

        streams = {}
        for translator_name, translator_id in rezka.translators.items():
            try:
                stream = rezka.getStream(translation=translator_id)(resolution)
                streams[translator_name] = stream
                logger.info(f"Fetched stream for translator '{translator_name}': {stream}")
            except Exception as e:
                logger.error(f"Error fetching stream for translator '{translator_name}': {e}")
                streams[translator_name] = None  # Или можно указать сообщение об ошибке

        return jsonify({'stream_urls': streams})
    except Exception as e:
        error_message = str(e)
        traceback_str = traceback.format_exc()
        logger.error(f"Error in /api/film/streams: {error_message}\n{traceback_str}")
        return jsonify({'error': error_message}), 500

@app.route('/api/film/trending', methods=['GET'])
def get_trending_films():
    """
    Получение списка популярных фильмов.
    Параметры запроса:
    - page: номер страницы (опционально)
    """
    page = int(request.args.get('page', '1'))
    try:
        # Формируем URL для получения популярных фильмов
        # Предположим, что сайт имеет специальную страницу для популярных фильмов
        trending_url = f"https://rezka.ag/films/page/{page}/?filter=watching"

        rezka_trending = create_rezka_api(trending_url)

        logger.info(f"Fetching trending films from URL: {trending_url}")

        results = []
        # Используем CSS-селектор для поиска <a> внутри <div class="b-content__inline_item-link">
        items = rezka_trending.soup.select('div.b-content__inline_item-link a')

        logger.info(f"Number of trending items found: {len(items)}")

        for item in items:
            film_url = item.get('href')
            film_name = item.get_text().strip()

            # Дополнительная проверка на наличие URL и названия
            if film_url and film_name:
                # Полный URL фильма
                full_film_url = f"{rezka_trending.origin}{film_url}" if not film_url.startswith('http') else film_url
                results.append({
                    'name': film_name,
                    'url': full_film_url
                })

        logger.info(f"Found {len(results)} trending films on page {page}")

        return jsonify({'results': results, 'page': page})
    except Exception as e:
        # Логирование ошибки и стектрейса
        error_message = str(e)
        traceback_str = traceback.format_exc()
        logger.error(f"Error in /api/film/trending: {error_message}\n{traceback_str}")
        return jsonify({'error': error_message}), 500

@app.route('/api/film/popular', methods=['GET'])
def get_popular_films():
    """
    Получение списка популярных фильмов.
    Параметры запроса:
    - page: номер страницы (опционально)
    """
    page = int(request.args.get('page', '1'))
    try:
        # Формируем URL для получения популярных фильмов
        popular_url = f"https://rezka.ag/films/page/{page}/?filter=popular"

        rezka_popular = create_rezka_api(popular_url)

        logger.info(f"Fetching popular films from URL: {popular_url}")

        results = []
        # Используем CSS-селектор для поиска <a> внутри <div class="b-content__inline_item-link">
        items = rezka_popular.soup.select('div.b-content__inline_item-link a')

        logger.info(f"Number of popular items found: {len(items)}")

        for item in items:
            film_url = item.get('href')
            film_name = item.get_text().strip()

            # Дополнительная проверка на наличие URL и названия
            if film_url and film_name:
                # Полный URL фильма
                full_film_url = f"{rezka_popular.origin}{film_url}" if not film_url.startswith('http') else film_url
                results.append({
                    'name': film_name,
                    'url': full_film_url
                })

        logger.info(f"Found {len(results)} popular films on page {page}")

        return jsonify({'results': results, 'page': page})
    except Exception as e:
        # Логирование ошибки и стектрейса
        error_message = str(e)
        traceback_str = traceback.format_exc()
        logger.error(f"Error in /api/film/popular: {error_message}\n{traceback_str}")
        return jsonify({'error': error_message}), 500

@app.route('/api/film/search', methods=['GET'])
def search_films():
    """
    Поиск фильмов по запросу.
    Параметры запроса:
    - query: текст поиска (обязательный)
    - include_adult: bool, включать ли взрослые фильмы (опционально)
    - year: год выпуска (опционально)
    - page: номер страницы (опционально)
    """
    query = request.args.get('query')
    include_adult = request.args.get('include_adult', 'false').lower() == 'true'
    year = request.args.get('year')
    page = int(request.args.get('page', '1'))

    if not query:
        return jsonify({'error': 'Параметр "query" обязателен'}), 400

    try:
        # Корректное кодирование поискового запроса
        encoded_query = quote_plus(query)

        # Формируем URL поиска с учетом фильтров
        filters = []
        if include_adult:
            filters.append('adult=1')  # Убедитесь, что сайт поддерживает этот фильтр
        if year:
            filters.append(f'year={year}')  # Убедитесь, что сайт поддерживает этот фильтр

        filters_str = '&'.join(filters) if filters else ''
        search_url = f"https://rezka.ag/search/?search={encoded_query}&page={page}"
        if filters_str:
            search_url += f"&{filters_str}"

        rezka_search = create_rezka_api(search_url)

        logger.info(f"Performing search for query: '{query}', page: {page}, include_adult: {include_adult}, year: {year}")
        logger.info(f"Search URL: {search_url}")

        results = []
        # Используем CSS-селектор для поиска <a> внутри <div class="b-content__inline_item-link">
        items = rezka_search.soup.select('div.b-content__inline_item-link a')

        logger.info(f"Number of search items found: {len(items)}")

        for item in items:
            film_url = item.get('href')
            film_name = item.get_text().strip()

            # Дополнительная проверка на наличие URL и названия
            if film_url and film_name:
                # Полный URL фильма
                full_film_url = f"{rezka_search.origin}{film_url}" if not film_url.startswith('http') else film_url
                results.append({
                    'name': film_name,
                    'url': full_film_url
                })

        logger.info(f"Found {len(results)} results for query '{query}' on page {page}")

        # Если фильтр 'include_adult' не поддерживается сайтом, можно удалить его из URL
        # или игнорировать его параметр

        return jsonify({'results': results, 'page': page})
    except Exception as e:
        # Логирование ошибки и стектрейса
        error_message = str(e)
        traceback_str = traceback.format_exc()
        logger.error(f"Error in /api/film/search: {error_message}\n{traceback_str}")
        return jsonify({'error': error_message}), 500

# Добавьте другие необходимые маршруты по аналогии

if __name__ == '__main__':
    app.run(debug=True)
