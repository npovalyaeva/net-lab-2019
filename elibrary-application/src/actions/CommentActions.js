import { commentConstants } from '../constants/commentConstants';
import CommentService from '../services/CommentService';

import { links } from '../config/links';
import { history } from '../store/store';
import { toastr } from 'react-redux-toastr'

class CommentActions {

    static addComment(comment) {
        const addRequest = (info) => {
            return {
                type: commentConstants.ADD_COMMENT_REQUEST,
                payload: {
                    info
                }
            }
        };
        const addFailure = (error) => {
            return {
                type: commentConstants.ADD_COMMENT_FAILURE,
                payload: {
                    error
                }
            }
        };
        const addSuccess = () => {
            return {
                type: commentConstants.ADD_COMMENT_SUCCESS,
                payload: {}
            }
        };

        return dispatch => {
            dispatch(addRequest(comment));
            CommentService.addComment(comment)
                .then(handleError)
                .then(() => {
                    dispatch(addSuccess(comment));
                    toastr.success("Comment was successfully added.");
                    history.push(links.BOOKS_PAGE);
                })
                .catch(error => {
                    dispatch(addFailure(error));
                    toastr.error("An error occured during adding.")
                });
        }
    }

    static deleteComment(id) {
        const deleteRequest = (info) => {
            return {
                type: commentConstants.DELETE_COMMENT_REQUEST,
                payload: {
                    info
                }
            }
        };
        const deleteSuccess = (info) => {
            return {
                type: commentConstants.DELETE_COMMENT_SUCCESS,
                payload: {
                    info
                }
            }
        };
        const deleteFailure = (error) => {
            return {
                type: commentConstants.DELETE_COMMENT_FAILURE,
                payload: {
                    error
                }
            }
        };

        return (dispatch) => {
            dispatch(deleteRequest());
            CommentService.deleteComment(id)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(deleteSuccess(info));
                    toastr.success("Comment was deleted.");
                    history.push(links.BOOKS_PAGE);
                    return info;
                })
                .catch(error => {
                    dispatch(deleteFailure(error));
                    toastr.error("Oh no!");
                });
        }
    }

    static getCommentsByBookId(id) {
        const getRequest = (info) => {
            return {
                type: commentConstants.GET_BOOK_COMMENTS_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: commentConstants.GET_BOOK_COMMENTS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: commentConstants.GET_BOOK_COMMENTS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            CommentService.getListOfCommentsByBookId(id)
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

    static setCurrentCommentText(commentText) {
        const setRequest = (commentText) => {
            return {
                type: commentConstants.SET_CURRENT_COMMENT_TEXT,
                payload: {
                    commentText: commentText
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(commentText));
        }
    }
}

let handleError = function(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default CommentActions;