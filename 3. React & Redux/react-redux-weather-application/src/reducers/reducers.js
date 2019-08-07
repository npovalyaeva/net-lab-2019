import { GET_FORECAST } from '../actions/actions'

const initialState = {
    currentCity: null,
    weatherData: null
}

export function getWeather(state = initialState, action) {
    switch (action.type) {
        case GET_FORECAST: 
            return { ...state, currentCity: action.currentCity, weatherData: action.weatherData };
        default:
            return state
    }
}

// ---------- ---------- ---------- ---------- ---------- ---------- ----------

