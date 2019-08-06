export const GET_FORECAST_WEATHER = 'GET_FORECAST_WEATHER'

export function getWeatherForecast(currentCity) {
    return {
        type: GET_FORECAST_WEATHER,
        currentCity
    };
}