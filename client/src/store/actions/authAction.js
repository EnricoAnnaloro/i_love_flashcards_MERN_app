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

import { returnErrors } from './index';
import { fetchUserSets } from './cardSetActions'

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
        .then(response => {
            dispatch({
                type: USER_LOADED,
                payload: response.data
            });
            dispatch(fetchUserSets());
        })
        .catch(error => {
            dispatch(returnErrors(error.response.data.msg, error.response.status));
            dispatch({
                type: USER_AUTH_ERROR
            })
        });
}

// Register a new user
export const registerUser = (userRegistrationInfo) => dispatch => {
    // Set up Registration header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // Set up request body
    // The JSON.stringify() method converts a JavaScript object or value to a JSON string
    const body = JSON.stringify({
        name: userRegistrationInfo.name,
        last_name: userRegistrationInfo.last_name,
        username: userRegistrationInfo.username,
        email: userRegistrationInfo.email,
        password: userRegistrationInfo.password
    });

    // Make the axios request for registration
    axios.post('http://localHost:5000/api/users/register', body, config)
        .then(response => dispatch({    // Recall in './routes/api/users.js' the route returns the token and userdata as response
            type: USER_REGISTER_SUCCESS,
            payload: response.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data.msg, error.response.status, 'REGISTER_FAIL'));
            dispatch({ type: USER_REGISTER_FAIL });
        });
}

// Login an exsiting user
export const loginUser = (userLoginInfo) => dispatch => {
    // Set up Registration header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // Set up request body
    // The JSON.stringify() method converts a JavaScript object or value to a JSON string
    const body = JSON.stringify({
        email: userLoginInfo.email,
        password: userLoginInfo.password
    });

    // Make the axios request for registration
    axios.post('http://localHost:5000/api/users/login', body, config)
        .then(response => dispatch({    // Recall in './routes/api/users.js' the route returns the token and userdata as response
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        }))
        .catch(error => {
            dispatch(returnErrors(error.response.data.msg, error.response.status, 'LOGIN_FAIL'));
            dispatch({ type: USER_LOGIN_FAIL });
        });
}

// Logout the user
export const logoutUser = () => dispatch => {
    dispatch({ type: USER_LOGOUT_SUCCESS });
}