import {
    USER_AUTH_ERROR,
    USER_LOADING,
    USER_LOADED,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        };

        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        }

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            }

        case USER_LOGIN_FAIL:
        case USER_AUTH_ERROR:
        case USER_LOGOUT_SUCCESS:
        case USER_REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        
        default:
            return state
    }
}

export default reducer;