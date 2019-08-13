export function GetYandexGeocoderURL(cityName) {
    return `https://geocode-maps.yandex.ru/1.x/?format=json&?apikey=7d5334f1-6bfb-484f-a173-ebf8c560139b&geocode=${cityName}`;
}

export function GetYandexWeatherURL(coordinates) {
    return `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v1/forecast?lat=${coordinates[1]}&lon=${coordinates[0]}&lang=en_USlimit=7&hours=false&extra=false`;
}

export const yandexAPIKey = 'b5a43458-5c75-4958-bb67-b59a4142f220';