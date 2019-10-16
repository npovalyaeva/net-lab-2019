import { commentConstants } from '../constants/commentConstants';

const initialState = {
    isLoading: true,
    info: [],
    error: null,
    loaded: null,
    currentBookComments: [],
    commentText: ''
}

export function commentReducer(state = initialState, action) {
    let data = action.payload;
    switch (action.type) {
        case commentConstants.GET_BOOK_COMMENTS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            }
        case commentConstants.GET_BOOK_COMMENTS_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false,
                currentBookComments: data.info
            }
        case commentConstants.GET_BOOK_COMMENTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: data.error,
                currentBookComments: []
            }
        case commentConstants.DELETE_COMMENT_REQUEST:
            return {
                ...state,
                error: null
            }
        case commentConstants.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                error: null
            }
        case commentConstants.DELETE_COMMENT_FAILURE:
            return {
                ...state,
                error: data.error,         
            }
        case commentConstants.SET_CURRENT_COMMENT_TEXT:
            return {
                ...state,
                commentText: data.commentText
            }
            case commentConstants.ADD_COMMENT_REQUEST:
                return {
                    ...state,
                    error: null,
                    isLoading: true,
                    loaded: data.comment
                }
            case commentConstants.ADD_COMMENT_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isLoading: false,
                    loaded: data.comment
                }
            case commentConstants.ADD_COMMENT_FAILURE:
                return {
                    ...state,
                    error: `Error occured: ${data.error}`,
                    isLoading: false,
                    loaded: null
                }
        default:
            return state;
    }
}