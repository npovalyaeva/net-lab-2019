import { authorConstants } from '../constants/authorConstants';
import AuthorService from '../services/AuthorService';

import { links } from '../config/links';
import { history } from '../store/store';
import { toastr } from 'react-redux-toastr'

class AuthorActions {

    static createAuthor(authorInfo) {
        
        const createRequest = (info) => {
            return {
                type: authorConstants.CREATE_AUTHOR_REQUEST,
                payload: {
                    info
                }
            };
        };
        const createSuccess = (info) => {
            return {
                type: authorConstants.CREATE_AUTHOR_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const createFailure = (error) => {
            return {
                type: authorConstants.CREATE_AUTHOR_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(createRequest(authorInfo));
            AuthorService.createAuthor(authorInfo)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(createSuccess(info));
                    toastr.success("New author was added.");
                    history.push(links.PROFILE_PAGE);
                    return info;
                })
                .catch(error => {
                    dispatch(createFailure(error));
                    toastr.error("Author couldn't be added. Please, check input.");
                });
        }
    }

    static getListOfAuthors() {
        
        const getRequest = (info) => {
            return {
                type: authorConstants.GET_LIST_OF_AUTHORS_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: authorConstants.GET_LIST_OF_AUTHORS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: authorConstants.GET_LIST_OF_AUTHORS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            AuthorService.getListOfAuthors()
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of authors.");
                });
        }
    }

    static setCurrentLastName(name) {
        const setRequest = (name) => {
            return {
                type: authorConstants.SET_CURRENT_AUTHOR_LAST_NAME,
                payload: {
                    lastName: name
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(name));
        }
    }

    static setCurrentFirstName(name) {
        const setRequest = (name) => {
            return {
                type: authorConstants.SET_CURRENT_AUTHOR_FIRST_NAME,
                payload: {
                    firstName: name
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(name));
        }
    }

    static setCurrentPatronymic(patronymic) {
        const setRequest = (patronymic) => {
            return {
                type: authorConstants.SET_CURRENT_AUTHOR_PATRONYMIC,
                payload: {
                    patronymic: patronymic
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(patronymic));
        }
    }
}

let handleError = function(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default AuthorActions;