import { GET_AUTHORS } from '../actions'

const initialState = {
    filter: null,
    booksData: null
}

export function authorsData(state = initialState, action) {
    switch (action.type) {
        case GET_AUTHORS: 
            return { ...state, authorsData: action.authorsData };
        default:
            return state
    }
}

