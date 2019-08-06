export const GET_WEATHER = 'GET_WEATHER';

export function getWeather(city) {
    return { type: GET_WEATHER, city }
}