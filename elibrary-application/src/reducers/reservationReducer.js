import { reservationConstants } from '../constants/reservationConstants';

const initialState = {
    isLoading: true,
    info: [],
    error: null,
    loaded: null,
    currentBookReservations: [],
    currentUserReservations: []
}

export function reservationReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case reservationConstants.GET_LIST_OF_RESERVATIONS_BY_BOOK_ID_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case reservationConstants.GET_LIST_OF_RESERVATIONS_BY_BOOK_ID_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                currentBookReservations: data.info
            }
        case reservationConstants.GET_LIST_OF_RESERVATIONS_BY_BOOK_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                currentBookReservations: []
            }
        case reservationConstants.GET_LIST_OF_RESERVATIONS_BY_USER_ID_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case reservationConstants.GET_LIST_OF_RESERVATIONS_BY_USER_ID_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                currentUserReservations: data.info
            }
        case reservationConstants.GET_LIST_OF_RESERVATIONS_BY_USER_ID_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                currentUserReservations: []
            }
        case reservationConstants.CREATE_RESERVATION_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                loaded: data.reservation
            }
        case reservationConstants.CREATE_RESERVATION_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                loaded: data.reservation
            }
        case reservationConstants.CREATE_RESERVATION_FAILURE:
            return {
                ...state,
                error: `Error occured: ${data.error}`,
                isLoading: false,
                loaded: null
            }
        case reservationConstants.DELETE_RESERVATION_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                loaded: data.reservation
            }
        case reservationConstants.DELETE_RESERVATION_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                loaded: data.reservation
            }
        case reservationConstants.DELETE_RESERVATION_FAILURE:
            return {
                ...state,
                error: `Error occured: ${data.error}`,
                isLoading: false,
                loaded: null
            }
        default:
            return state;
    }
}