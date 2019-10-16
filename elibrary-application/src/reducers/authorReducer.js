import { authorConstants } from '../constants/authorConstants';

const initialState = {
    isLoading: false,
    info: [],
    error: null,
    loaded: null,
    lastName: null,
    firstName: null,
    patronymic: null,
    authors: []
}

export function authorReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case authorConstants.GET_LIST_OF_AUTHORS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case authorConstants.GET_LIST_OF_AUTHORS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                authors: data.info
            }
        case authorConstants.GET_LIST_OF_AUTHORS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error
            }
        case authorConstants.CREATE_AUTHOR_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                loaded: data.author
            }
        case authorConstants.CREATE_AUTHOR_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                loaded: data.author
            }
        case authorConstants.CREATE_AUTHOR_FAILURE:
            return {
                ...state,
                error: `Error occured: ${data.error}`,
                isLoading: false,
                loaded: null
            }
        case authorConstants.SET_CURRENT_AUTHOR_LAST_NAME:
            return {
                ...state,
                lastName: data.lastName
            }
        case authorConstants.SET_CURRENT_AUTHOR_FIRST_NAME:
            return {
                ...state,
                firstName: data.firstName
            }
        case authorConstants.SET_CURRENT_AUTHOR_PATRONYMIC:
            return {
                ...state,
                patronymic: data.patronymic
            }
        default:
            return state;
    }
}