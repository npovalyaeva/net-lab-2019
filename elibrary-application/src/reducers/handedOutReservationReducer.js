import { handedOutReservationConstants } from '../constants/handedOutReservationConstants';

const initialState = {
    isLoading: true,
    info: [],
    error: null,
    handedOutReservations: []
}

export function handedOutReservationReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                handedOutReservations: data.info
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                handedOutReservations: []
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                handedOutReservations: data.info
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                handedOutReservations: []
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                handedOutReservations: data.info
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                handedOutReservations: []
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                handedOutReservations: data.info
            }
        case handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                handedOutReservations: []
            }
        default:
            return state;
    }
}