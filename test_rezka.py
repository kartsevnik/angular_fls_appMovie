from HdRezkaApi import HdRezkaApi

def progress(current, all):
    percent = round(current * 100 / all)
    print(f"{percent}%: {current}/{all}", end="\r")

url = "https://rezka.ag/films/drama/806-pobeg-iz-shoushenka-1994.html"
rezka = HdRezkaApi(url)

print("Name:", rezka.name)
print("Thumbnail:", rezka.thumbnail)
print("Rating:", rezka.rating.value)
print("Votes:", rezka.rating.votes)
print("Translators:", rezka.translators)
print("Other Parts:", rezka.otherParts)
print("Type:", rezka.type)

# Проверяем, является ли это сериалом перед вызовом seriesInfo
if rezka.type == "tv_series":  # или HdRezkaTVSeries, если у вас определен тип
    print("Series Info:", rezka.seriesInfo)
else:
    print("This is a movie, no series info available.")

# Попробуем получить стрим для фильма
try:
    stream_url = rezka.getStream()(720)
    print("Stream URL:", stream_url)
except Exception as e:
    print("Error getting stream:", e)
