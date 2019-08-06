import { GET_WEATHER } from '../actions/actions'

const initialState = {
    currentCity: 'Minsk',
    //cityData: 
    //weatherData:
}

export function weatherData(state = {}, action) {
    switch (action.type) {
        case 'FETCH_WEATHER_DATA_SUCCESS':
            return action.fetchedData;
        default:
            return state;
    }
}

export function cityData(state = {}, action) {
    switch (action.type) {
        case 'FETCH_CITY_DATA_SUCCESS':
            return action.fetchedData;
        default:
            return state;
    }
}