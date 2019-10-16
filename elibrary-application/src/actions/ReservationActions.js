import { reservationConstants } from '../constants/reservationConstants';
import ReservationService from '../services/ReservationService';

import { links } from '../config/links';
import { history } from '../store/store';
import { toastr } from 'react-redux-toastr'

class ReservationActions {

    static createReservation(reservation) {
        const createRequest = (info) => {
            return {
                type: reservationConstants.CREATE_RESERVATION_REQUEST,
                payload: {
                    info
                }
            }
        };
        const createFailure = (error) => {
            return {
                type: reservationConstants.CREATE_RESERVATION_FAILURE,
                payload: {
                    error
                }
            }
        };
        const createSuccess = () => {
            return {
                type: reservationConstants.CREATE_RESERVATION_SUCCESS,
                payload: {}
            }
        };

        return dispatch => {
            dispatch(createRequest(reservation));
            ReservationService.createReservation(reservation)
                .then(handleError)
                .then(() => {
                    dispatch(createSuccess(reservation));
                    toastr.success("Copy was successfully booked.");
                    history.push(links.BOOKS_PAGE);
                })
                .catch(error => {
                    dispatch(createFailure(error));
                    toastr.error("An error occured during adding.")
                });
        }
    }

    static updateReservation(reservation) {
        const updateRequest = (info) => {
            return {
                type: reservationConstants.UPDATE_RESERVATION_REQUEST,
                payload: {
                    info
                }
            }
        };
        const updateFailure = (error) => {
            return {
                type: reservationConstants.UPDATE_RESERVATION_FAILURE,
                payload: {
                    error
                }
            }
        };
        const updateSuccess = () => {
            return {
                type: reservationConstants.UPDATE_RESERVATION_SUCCESS,
                payload: {}
            }
        };

        return dispatch => {
            dispatch(updateRequest(reservation));
            ReservationService.updateReservation(reservation)
                .then(handleError)
                .then(() => {
                    dispatch(updateSuccess(reservation));
                    toastr.success("Reservation was successfully updated.");
                    history.push(links.BOOKS_PAGE);
                })
                .catch(error => {
                    dispatch(updateFailure(error));
                    toastr.error("An error occured during this action.")
                });
        }
    }

    static deleteReservation(id) {
        const deleteRequest = (info) => {
            return {
                type: reservationConstants.DELETE_RESERVATION_REQUEST,
                payload: {
                    info
                }
            }
        };
        const deleteFailure = (error) => {
            return {
                type: reservationConstants.DELETE_RESERVATION_FAILURE,
                payload: {
                    error
                }
            }
        };
        const deleteSuccess = () => {
            return {
                type: reservationConstants.DELETE_RESERVATION_SUCCESS,
                payload: {}
            }
        };

        return dispatch => {
            dispatch(deleteRequest(id));
            ReservationService.deleteReservation(id)
                .then(handleError)
                .then(() => {
                    dispatch(deleteSuccess(id));
                    toastr.success("Reservation was successfully deleted.");
                    history.push(links.BOOKS_PAGE);
                })
                .catch(error => {
                    dispatch(deleteFailure(error));
                    toastr.error("An error occured during this action.")
                });
        }
    }

    static getListOfReservations(bookId) {
        const getRequest = (info) => {
            return {
                type: reservationConstants.GET_LIST_OF_RESERVATIONS_BY_BOOK_ID_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: reservationConstants.GET_LIST_OF_RESERVATIONS_BY_BOOK_ID_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: reservationConstants.GET_LIST_OF_RESERVATIONS_BY_BOOK_ID_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            ReservationService.getListOfReservationsByBookId(bookId)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                });
        }
    }

    static getListOfUserReservations(userId) {
        const getRequest = (info) => {
            return {
                type: reservationConstants.GET_LIST_OF_RESERVATIONS_BY_USER_ID_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: reservationConstants.GET_LIST_OF_RESERVATIONS_BY_USER_ID_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: reservationConstants.GET_LIST_OF_RESERVATIONS_BY_USER_ID_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            ReservationService.getListOfReservationsByUserId(userId)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
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

export default ReservationActions;