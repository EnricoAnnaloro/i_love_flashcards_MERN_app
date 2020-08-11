import axios from 'axios';

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

import { returnErrors, clearErrors } from './index';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading 
    dispatch({ type: USER_LOADING });

    // Get token value
    const token = getState().authReducer.token;

    // Configuring headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If there is a token, add it to the config headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    // Fetch user
    axios.get("http://localHost:5000/api/users", config)
        .then(response => dispatch({
            type: USER_LOADED,
            payload: response.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: USER_AUTH_ERROR
            })
        });
}