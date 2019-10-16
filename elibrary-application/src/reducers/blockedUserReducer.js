import { userConstants } from '../constants/userConstants';

const initialState = {
    isLoading: true,
    error: null,
    blockedUsers: []
}

export function blockedUserReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        
        case userConstants.GET_BLOCKED_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case userConstants.GET_BLOCKED_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                blockedUsers: data.info
            }
        case userConstants.GET_BLOCKED_USERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                blockedUsers: []
                
            }
        case userConstants.BLOCK_USER_REQUEST:
            return {
                ...state,
                error: null
            }
        case userConstants.BLOCK_USER_SUCCESS:
            return {
                ...state,
                error: null
            }
        case userConstants.BLOCK_USER_FAILURE:
            return {
                ...state,
                error: data.error,         
        }
        case userConstants.UNBLOCK_USER_REQUEST:
            return {
                ...state,
                error: null
            }
        case userConstants.UNBLOCK_USER_SUCCESS:
            return {
                ...state,
                error: null
            }
        case userConstants.UNBLOCK_USER_FAILURE:
            return {
                ...state,
                error: data.error,         
        }
        default:
            return state;
    }
}