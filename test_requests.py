import requests

# URL, который вы хотите протестировать
url = "https://rezka.ag/films/drama/806-pobeg-iz-shoushenka-1994.html"

# Добавляем заголовок User-Agent
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

try:
    # Выполняем GET-запрос к сайту с заголовком
    response = requests.get(url, headers=headers)

    # Проверяем статус-код ответа
    print(f"Status code: {response.status_code}")

    # Выводим текст HTML-страницы, чтобы посмотреть на ее содержимое
    print("Response text:")
    print(response.text[:500])  # Выводим первые 500 символов для наглядности

except Exception as e:
    print(f"An error occurred: {e}")
