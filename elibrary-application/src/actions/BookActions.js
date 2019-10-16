import { bookConstants } from '../constants/bookConstants';
import BookService from '../services/BookService';

import { links } from '../config/links';
import { history } from '../store/store';
import { toastr } from 'react-redux-toastr'

class BookActions {

    static createBook(bookInfo) {  
        const createRequest = (info) => {
            return {
                type: bookConstants.CREATE_BOOK_REQUEST,
                payload: {
                    info
                }
            };
        };
        const createSuccess = (info) => {
            return {
                type: bookConstants.CREATE_BOOK_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const createFailure = (error) => {
            return {
                type: bookConstants.CREATE_BOOK_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(createRequest(bookInfo));
            BookService.createBook(bookInfo)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(createSuccess(info));
                    toastr.success("New book was added.");
                    history.push(links.PROFILE_PAGE);
                    return info;
                })
                .catch(error => {
                    dispatch(createFailure(error));
                    toastr.error("Book couldn't be added. Please, check input.");
                });
        }
    }

    static getListOfBooks() {
        const getRequest = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            BookService.getListOfBooks()
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of books.");
                });
        }
    }

    static getListOfFreeBooks() {
        const getRequest = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_FREE_BOOKS_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_FREE_BOOKS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: bookConstants.GET_LIST_OF_FREE_BOOKS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            BookService.getListOfFreeBooks()
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of books.");
                });
        }
    }

    static getListOfBooksByTitle(title) {
        const getRequest = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_TITLE_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_TITLE_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_TITLE_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            BookService.getListOfBooksByTitle(title)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of books.");
                });
        }
    }

    static getListOfBooksByAuthor(name) {
        const getRequest = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_AUTHOR_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_AUTHOR_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_AUTHOR_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            BookService.getListOfBooksByAuthor(name)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of books.");
                });
        }
    }

    static getListOfBooksByYear(year) {
        const getRequest = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_YEAR_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_YEAR_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: bookConstants.GET_LIST_OF_BOOKS_BY_YEAR_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            BookService.getListOfBooksByYear(year)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a list of books.");
                });
        }
    }

    static getBook(id) {
        const getRequest = (info) => {
            return {
                type: bookConstants.GET_BOOK_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: bookConstants.GET_BOOK_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: bookConstants.GET_BOOK_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            BookService.getBook(id)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(getSuccess(info));
                    return info;
                })
                .catch(error => {
                    dispatch(getFailure(error));
                    toastr.error("We can't get a book.");
                });
        }
    }

    static setCurrentTitle(title) {
        const setRequest = (title) => {
            return {
                type: bookConstants.SET_CURRENT_BOOK_TITLE,
                payload: {
                    title: title
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(title));
        }
    }

    static setCurrentAuthorId(authorId) {
        const setRequest = (authorId) => {
            return {
                type: bookConstants.SET_CURRENT_BOOK_AUTHOR_ID,
                payload: {
                    authorId: authorId
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(authorId));
        }
    }

    static setCurrentYear(year) {
        const setRequest = (year) => {
            return {
                type: bookConstants.SET_CURRENT_BOOK_YEAR,
                payload: {
                    year: year
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(year));
        }
    }

    static setCurrentImage(cover) {
        const setRequest = (cover) => {
            return {
                type: bookConstants.SET_CURRENT_BOOK_IMAGE,
                payload: {
                    cover: cover
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(cover));
        }
    }

    static setCurrentCopiesCount(copiesCount) {
        const setRequest = (copiesCount) => {
            return {
                type: bookConstants.SET_CURRENT_BOOK_COPIES_COUNT,
                payload: {
                    copiesCount: copiesCount
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(copiesCount));
        }
    }

    static setSwitchState(switchState) {
        const setRequest = (switchState) => {
            return {
                type: bookConstants.SET_CURRENT_SWITCH_STATE,
                payload: {
                    switchState: switchState
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(switchState));
        }
    }
}

let handleError = function(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default BookActions;