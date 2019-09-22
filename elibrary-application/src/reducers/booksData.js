import { GET_BOOKS } from '../actions'

const initialState = {
    filter: null,
    booksData: null
}

export function booksData(state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS: 
            return { ...state, filter: action.filter, booksData: action.booksData };
        default:
            return state
    }
}

