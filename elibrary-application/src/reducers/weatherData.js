import { GET_FORECAST } from '../actions'

const initialState = {
    currentCity: null,
    factWeatherData: null,
    weatherData: null
}

export function weatherData(state = initialState, action) {
    switch (action.type) {
        case GET_FORECAST: 
            return { ...state, currentCity: action.currentCity, factWeatherData: action.factWeatherData, weatherData: action.weatherData };
        default:
            return state
    }
}

