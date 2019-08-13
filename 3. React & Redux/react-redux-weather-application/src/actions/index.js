import { GetYandexGeocoderURL, GetYandexWeatherURL, yandexAPIKey } from '../constants';

export const GET_FORECAST = 'GET_FORECAST'

export function getForecast(currentCity, factWeatherData, weatherData) {
    return {
        type: GET_FORECAST,
        currentCity: currentCity,
        factWeatherData: factWeatherData,
        weatherData: weatherData
    };
}

export function fetchData(cityName) {
    const URL = GetYandexGeocoderURL(cityName);

    return (dispatch) => {
        fetch(URL)
        .then(response => response.json())
        .then(json => {
            if (parseInt(json.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found, 10) > 0) {
                dispatch(fetchForecast(json.response.GeoObjectCollection.featureMember[0].GeoObject));
            }
        })
        .catch((error) => console.log(error));
    };
}

function fetchForecast(cityData) {
    const coordinates = cityData.Point.pos.split(' ');
    const URL = GetYandexWeatherURL(coordinates);

    return (dispatch) => {
        fetch(URL, {
            method: 'GET',
            headers: {
                'X-Yandex-API-Key' : yandexAPIKey
            }
        })
        .then(response => response.json())
        .then(json => {
            dispatch(getForecast(cityData.name, json.fact, json.forecasts));
        })
        .catch((error) => console.log(error));
    };
}