import { userConstants } from '../constants/userConstants';

const initialState = {
    isLoading: true,
    error: null,
    isValid: false,
    userInfo: {},
    loggedIn: false,
    redirect: false,
    isAdmin: false,
    signedUp: false,

    login: '',
    password: ''
}

export function userReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case userConstants.SIGN_IN_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                userInfo: data.info,           
                loggedIn: false,
                redirect: false,
                signedUp: false
            };
        case userConstants.SIGN_IN_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                userInfo: state.userInfo,               
                loggedIn: true,
                redirect: true
            }
        case userConstants.SIGN_IN_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false,
                isValid: false,
                loggedIn: false,
                redirect: false,
                isAdmin: false
                
            }
        case userConstants.SIGN_UP_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                userInfo: data.info,               
                loggedIn: false,
                redirect: false
            }
        case userConstants.SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                userInfo: state.userInfo,               
                signedUp: true
            }
        case userConstants.SIGN_UP_FAILURE:
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
        case userConstants.GET_INFO:
            return {
                ...state,
                loggedIn: state.loggedIn,
                userInfo: state.userInfo,
            }
        case userConstants.GET_PROFILE_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
                userInfo: {},
                redirect: false
            }
        case userConstants.GET_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                userInfo: data.info,                
                loggedIn: true,
                isAdmin: data.info.role.name === "Moderator"
            }
        case userConstants.GET_PROFILE_FAILURE:
            return {
                ...state,
                error: data.error,
                isLoading: false,
                userInfo: {},                
                loggedIn: false,              
                isAdmin: false,
                redirect: false
            }
        case userConstants.GET_CURRENT_PROFILE:
            return {
                ...state,
                error: null,
                loggedIn: true,
                userInfo: state.userInfo,
            }
        case userConstants.RESET:
            return {
                ...state,
                isLoading: false,
                error: null,             
                redirect: false
            }
        case userConstants.SIGN_OUT_REQUEST:
            return { 
                isLoading: true
            }
        case userConstants.SIGN_OUT_FAILURE:
            return {
                error: data.error,
                isLoading: false
            }
        case userConstants.SIGN_OUT_SUCCESS:
            return {
                userInfo: {},
                loggedIn: false,
                isLoading: false
            }
        case userConstants.RESET:
            return {
                ...state,
                error: null,
                isLoading: false,
                redirect: false
            }
        case userConstants.SET_CURRENT_USER_LOGIN:
            return {
                ...state,
                login: data.login
            }
        case userConstants.SET_CURRENT_USER_PASSWORD:
            return {
                ...state,
                password: data.password
            }
        default:
            return state;
    }
}