export const GET_FORECAST = 'GET_FORECAST'

export function getForecast(currentCity, weatherData) {
    return {
        type: GET_FORECAST,
        currentCity: currentCity,
        weatherData: weatherData
    };
}

export function fetchData(cityName) {
    const yandexGeocoderURL = `https://geocode-maps.yandex.ru/1.x/?format=json&?apikey=7d5334f1-6bfb-484f-a173-ebf8c560139b&geocode=${cityName}`;

    return (dispatch) => {
        fetch(yandexGeocoderURL)
        .then(response => response.json())
        .then(json => {
            if (parseInt(json.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found, 10) > 0) {
                console.log(json);
                dispatch(fetchForecast(json.response.GeoObjectCollection.featureMember[0].GeoObject));
            }
        })
        .catch((error) => console.log(error));
    };
}

function fetchForecast(cityData) {
    const coordinates = cityData.Point.pos.split(' ');
    const yandexWeatherURL = `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v1/forecast?lat=${coordinates[1]}&lon=${coordinates[0]}&lang=en_USlimit=7&hours=false&extra=false`;

    return (dispatch) => {
        fetch(yandexWeatherURL, {
            method: 'GET',
            headers: {
                'X-Yandex-API-Key' : 'b5a43458-5c75-4958-bb67-b59a4142f220'
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            dispatch(getForecast(cityData.name, json));
        })
        .catch((error) => console.log(error));
    };
}