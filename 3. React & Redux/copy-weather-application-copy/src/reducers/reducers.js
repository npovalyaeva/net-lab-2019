import { GET_FORECAST_WEATHER } from '../actions/actions'

const initialState = {
    currentCity: 'Minsk',
    weatherData: 'Olo'
    // weatherData: fetchData('Minsk')
  }

export function getWeather(state = initialState, action) {
    
    switch (action.type) {
        case GET_FORECAST_WEATHER:
            return Object.assign({}, state, {
                weatherData: fetchData(action.currentCity),
                currentCity: action.currentCity 
            })
        default:
            return state
    }
}

// ---------- ---------- ---------- ---------- ---------- ---------- ----------

function fetchData(cityName) {
    const yandexGeocoderURL = `https://geocode-maps.yandex.ru/1.x/?format=json&?apikey=7d5334f1-6bfb-484f-a173-ebf8c560139b&geocode=${cityName}`;
    fetch(yandexGeocoderURL)
    .then(response => response.json())
    .then(json => {
        if (parseInt(json.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found, 10) > 0) {
            console.log(json);
            getForecast(json.response.GeoObjectCollection.featureMember[0].GeoObject);
        }
        // else {
        //    getCoordinates('Minsk');
        // }
    })
}

function getForecast(cityData) {
    const coordinates = cityData.Point.pos.split(' ');
    const yandexWeatherURL = `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v1/forecast?lat=${coordinates[1]}&lon=${coordinates[0]}&lang=en_USlimit=7&hours=false&extra=false`;

    fetch(yandexWeatherURL, {
        method: 'GET',
        headers: {
            'X-Yandex-API-Key' : 'b5a43458-5c75-4958-bb67-b59a4142f220'
        }
    })
    .then(response => response.json())
    .then(json => {
        debugger
        return json;
    })
}