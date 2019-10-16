import { handedOutReservationConstants } from '../constants/handedOutReservationConstants';
import HandedOutReservationService from '../services/HandedOutReservationService';

import { links } from '../config/links';
import { history } from '../store/store';
import { toastr } from 'react-redux-toastr'

class HandedOutReservationActions {

    static getListOfHandedOutReservations() {
        const getRequest = (info) => {
            return {
                type: handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: handedOutReservationConstants.GET_LIST_OF_HANDED_OUT_RESERVATIONS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            HandedOutReservationService.getListOfHandedOutReservations()
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of reservations.");
                });
        }
    }

    static getListOfHandedOutReservationsByBookTitle(title) {
        const getRequest = (info) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_BOOK_TITLE_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            HandedOutReservationService.getListOfHandedOutReservationsByBookTitle(title)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of reservations.");
                });
        }
    }

    static getListOfHandedOutReservationsByBookAuthor(name) {
        const getRequest = (info) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_BOOK_AUTHOR_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            HandedOutReservationService.getListOfHandedOutReservationsByBookAuthor(name)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of reservations.");
                });
        }
    }

    static getListOfHandedOutReservationsByCountOfDays(days) {
        const getRequest = (info) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: handedOutReservationConstants.GET_HANDED_OUT_RESERVATIONS_BY_COUNT_OF_DAYS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            HandedOutReservationService.getListOfHandedOutReservationsByCountOfDays(days)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of reservations.");
                });
        }
    }
}

let handleError = function(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default HandedOutReservationActions;