import { userCreationConstants } from '../constants/userCreationConstants';
import { links } from '../config/links';
import UserService from '../services/UserService';
import { history } from '../store/store';
import { toastr } from 'react-redux-toastr'

class UserActions {

    static signUp(userInfo) {
        const signUpRequest = (info) => {
            return {
                type: userCreationConstants.SIGN_UP_REQUEST,
                payload: {
                    info
                }
            }
        };
        const signUpFailure = (error) => {
            return {
                type: userCreationConstants.SIGN_UP_FAILURE,
                payload: {
                    error
                }
            }
        };
        const signUpSuccess = (info) => {
            return {
                type: userCreationConstants.SIGN_UP_SUCCESS,
                payload: {
                    info
                }
            }
        };

        return dispatch => {
            dispatch(signUpRequest(userInfo));
            UserService.signUp(userInfo)
                .then(handleError)
                .then(() => {
                    dispatch(signUpSuccess(userInfo));
                    toastr.success("Sign Up", "User was successfully created.");
                    history.push(links.SIGN_IN_PAGE);
                })
                .catch(error => {
                    dispatch(signUpFailure(error));
                    toastr.error("Sign Up", "An error occured during sign up.")
                });
        }
    }

    static setCurrentEmail(email) {
        const setRequest = (email) => {
            return {
                type: userCreationConstants.SET_CURRENT_EMAIL,
                payload: {
                    email: email
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(email));
        }
    }

    static setCurrentUsername(username) {
        const setRequest = (username) => {
            return {
                type: userCreationConstants.SET_CURRENT_USERNAME,
                payload: {
                    username: username
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(username));
        }
    }

    static setCurrentFirstName(firstName) {
        const setRequest = (firstName) => {
            return {
                type: userCreationConstants.SET_CURRENT_FIRST_NAME,
                payload: {
                    firstName: firstName
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(firstName));
        }
    }

    static setCurrentLastName(lastName) {
        const setRequest = (lastName) => {
            return {
                type: userCreationConstants.SET_CURRENT_LAST_NAME,
                payload: {
                    lastName: lastName
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(lastName));
        }
    }

    static setCurrentPassword(password) {
        const setRequest = (password) => {
            return {
                type: userCreationConstants.SET_CURRENT_PASSWORD,
                payload: {
                    password: password
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(password));
        }
    }

    static setCurrentPasswordConfirmation(passwordConfirmation) {
        const setRequest = (passwordConfirmation) => {
            return {
                type: userCreationConstants.SET_CURRENT_PASSWORD_CONFIRMATION,
                payload: {
                    passwordConfirmation: passwordConfirmation
                }
            }
        };
        return dispatch => {
            dispatch(setRequest(passwordConfirmation));
        }
    }
}

function handleError(response) {
    if (!response.ok) {
        throw Error(response.status)
    }
    return response;
}

export default UserActions;