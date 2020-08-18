import axios from 'axios';

import {
    FETCHING_USER_SETS_START,
    FETCHING_USER_SETS_SUCCESS,
    FETCHING_USER_SETS_FAIL,
    CREATING_USER_SET_START,
    CREATING_USER_SET_SUCCESS,
    CREATING_USER_SET_FAIL,
} from '../actions/actionTypes';

import { returnErrors } from './index';

export const fetchUserSets = () => (dispatch, getState) => {
    // Setting loading procedure 
    dispatch({ type: FETCHING_USER_SETS_START });

    // If user is still not into the Auth Reducer then return error
    if (!getState().authReducer.user) return dispatch(returnErrors("User is not in logged in", null));

    // setting the request url
    const reqURL = "http://localHost:5000/api/cardSets/userCards/" + getState().authReducer.user._id;

    console.log(reqURL)

    axios.get(reqURL)
        .then(response => {
            // The useful sets are in response.data.userSets which is an Array with cardSets objects
            return dispatch({
                type: FETCHING_USER_SETS_SUCCESS,
                userSets: response.data.userSets
            })
        })
        .catch(error => console.log(error));
}