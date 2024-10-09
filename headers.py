def create_rezka_api(url, proxy=None):
    session = requests.Session()
    session.headers.update({
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/81.0.4044.138 Safari/537.36'
        ),
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': (
            'text/html,application/xhtml+xml,application/xml;'
            'q=0.9,image/webp,image/apng,*/*;q=0.8'
        ),
        'Referer': 'https://rezka.ag/',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    })
    response = session.get(url, proxies=proxy)
    logger.info(f"HTTP Status Code for URL {url}: {response.status_code}")
    return HdRezkaApi(response.text, proxy=proxy, headers=session.headers)