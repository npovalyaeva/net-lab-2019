import { bookConstants } from '../constants/bookConstants';

const initialState = {
    isLoading: true,
    info: [],
    error: null,
    title: '',
    authorId: 1,
    year: '',
    cover: '',
    copiesCount: '',
    books: [],
    currentBook: null,
    switchState: false,
}

export function bookReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case bookConstants.CREATE_BOOK_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                loaded: data.book
            }
        case bookConstants.CREATE_BOOK_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                loaded: data.book
            }
        case bookConstants.CREATE_BOOK_FAILURE:
            return {
                ...state,
                error: `Error occured: ${data.error}`,
                isLoading: false,
                loaded: null
            }
        case bookConstants.GET_LIST_OF_BOOKS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case bookConstants.GET_LIST_OF_BOOKS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                books: data.info
            }
        case bookConstants.GET_LIST_OF_BOOKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error
            }

        case bookConstants.GET_LIST_OF_FREE_BOOKS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case bookConstants.GET_LIST_OF_FREE_BOOKS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                books: data.info
            }
        case bookConstants.GET_LIST_OF_FREE_BOOKS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error
            }

        case bookConstants.GET_LIST_OF_BOOKS_BY_TITLE_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case bookConstants.GET_LIST_OF_BOOKS_BY_TITLE_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                books: data.info
            }
        case bookConstants.GET_LIST_OF_BOOKS_BY_TITLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error
            }

        case bookConstants.GET_LIST_OF_BOOKS_BY_AUTHOR_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case bookConstants.GET_LIST_OF_BOOKS_BY_AUTHOR_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                books: data.info
            }
        case bookConstants.GET_LIST_OF_BOOKS_BY_AUTHOR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error
            }

        case bookConstants.GET_LIST_OF_BOOKS_BY_YEAR_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case bookConstants.GET_LIST_OF_BOOKS_BY_YEAR_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                books: data.info
            }
        case bookConstants.GET_LIST_OF_BOOKS_BY_YEAR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error
            }

        case bookConstants.GET_BOOK_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case bookConstants.GET_BOOK_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                currentBook: data.info
            }
        case bookConstants.GET_BOOK_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                currentBook: null
            }
        case bookConstants.SET_CURRENT_BOOK_ID:
            return {
                ...state,
                currentBookId: data.currentBookId
            }
        case bookConstants.SET_CURRENT_BOOK_TITLE:
            return {
                ...state,
                title: data.title
            }
        case bookConstants.SET_CURRENT_BOOK_AUTHOR_ID:
            return {
                ...state,
                authorId: data.authorId
            }
        case bookConstants.SET_CURRENT_BOOK_YEAR:
            return {
                ...state,
                year: data.year
            }
        case bookConstants.SET_CURRENT_BOOK_IMAGE:
            return {
                ...state,
                cover: data.cover
            }
        case bookConstants.SET_CURRENT_BOOK_COPIES_COUNT:
            return {
                ...state,
                copiesCount: data.copiesCount
            }
        case bookConstants.SET_CURRENT_SWITCH_STATE:
            return {
                ...state,
                switchState: data.switchState
            }
        default:
            return state;
    }
}