import { userCreationConstants } from '../constants/userCreationConstants';
import { isRequired, arePasswordsEquals, isEmail } from '../constants/validationRules';

const initialState = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirmation: '',

    emailError: null,
    usernameError: null,
    firstNameError: null,
    lastNameError: null,
    passwordError: null,
    passwordConfirmationError: null
}

export function userCreationReducer(state = initialState, action) {
    let data = action.payload;
    let currentPassword = state.password;
    switch (action.type) {
        case userCreationConstants.SIGN_UP_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                userInfo: data.info,               
                loggedIn: false,
                redirect: false
            }
        case userCreationConstants.SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                userInfo: state.userInfo,               
                signedUp: true
            }
        case userCreationConstants.SIGN_UP_FAILURE:
            return {
                ...state,
                error: data.error || null,
                isLoading: false,
                isValid: false,              
                loggedIn: false,
                redirect: false,
                isAdmin: false,
                signedUp: false
            }

        case userCreationConstants.SET_CURRENT_EMAIL:
            return {
                ...state,
                email: data.email,
                emailError: isEmail(data.email)
            }
        case userCreationConstants.SET_CURRENT_USERNAME:
            return {
                ...state,
                username: data.username,
                usernameError: isRequired(data.username)
            }
        case userCreationConstants.SET_CURRENT_FIRST_NAME:
            return {
                ...state,
                firstName: data.firstName,
                firstNameError: isRequired(data.firstName)
            }
        case userCreationConstants.SET_CURRENT_LAST_NAME:
            return {
                ...state,
                lastName: data.lastName,
                lastNameError: isRequired(data.lastName)
            }
        case userCreationConstants.SET_CURRENT_PASSWORD:
            return {
                ...state,
                password: data.password,
                passwordError: isRequired(data.password)
            }
        case userCreationConstants.SET_CURRENT_PASSWORD_CONFIRMATION:
            return {
                ...state,
                passwordConfirmation: data.passwordConfirmation,
                passwordConfirmationError: arePasswordsEquals(currentPassword, data.passwordConfirmation)
            }

        default:
            return state;
    }
}