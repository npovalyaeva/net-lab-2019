import { userConstants } from '../constants/userConstants';
import { links } from '../config/links';
import UserService from '../services/UserService';
import { history } from '../store/store';
import { toastr } from 'react-redux-toastr'

class BlockedUserActions {

    static blockUser(info) {
        const blockRequest = (info) => {
            return {
                type: userConstants.BLOCK_USER_REQUEST,
                payload: {
                    info
                }
            }
        };
        const blockSuccess = (info) => {
            return {
                type: userConstants.BLOCK_USER_SUCCESS,
                payload: {
                    info
                }
            }
        };
        const blockFailure = (error) => {
            return {
                type: userConstants.BLOCK_USER_FAILURE,
                payload: {
                    error
                }
            }
        };

        return (dispatch) => {
            dispatch(blockRequest());
            UserService.blockUser(info)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(blockSuccess(info));
                    toastr.success("User was blocked.");
                    history.push(links.PROFILE_PAGE);
                    return info;
                })
                .catch(error => {
                    dispatch(blockFailure(error));
                    toastr.error("Oh no!");
                });
        }
    }

    static unblockUser(id) {
        const unblockRequest = (info) => {
            return {
                type: userConstants.UNBLOCK_USER_REQUEST,
                payload: {
                    info
                }
            }
        };
        const unblockSuccess = (info) => {
            return {
                type: userConstants.UNBLOCK_USER_SUCCESS,
                payload: {
                    info
                }
            }
        };
        const unblockFailure = (error) => {
            return {
                type: userConstants.UNBLOCK_USER_FAILURE,
                payload: {
                    error
                }
            }
        };

        return (dispatch) => {
            dispatch(unblockRequest());
            UserService.unblockUser(id)
                .then(handleError)
                .then(result => result.json())
                .then(info => {
                    dispatch(unblockSuccess(info));
                    toastr.success("User was unblocked.");
                    history.push(links.PROFILE_PAGE);
                    return info;
                })
                .catch(error => {
                    dispatch(unblockFailure(error));
                    toastr.error("Oh no!");
                });
        }
    }

    static getBlockedUsers() {
        
        const getRequest = (info) => {
            return {
                type: userConstants.GET_BLOCKED_USERS_REQUEST,
                payload: {
                    info
                }
            };
        };
        const getSuccess = (info) => {
            return {
                type: userConstants.GET_BLOCKED_USERS_SUCCESS,
                payload: {
                    info
                }
            };
        };
        const getFailure = (error) => {
            return {
                type: userConstants.GET_BLOCKED_USERS_FAILURE,
                payload: {
                    error
                }
            };
        };

        return dispatch => {
            dispatch(getRequest());
            UserService.getBlockedUsers()
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

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default BlockedUserActions;