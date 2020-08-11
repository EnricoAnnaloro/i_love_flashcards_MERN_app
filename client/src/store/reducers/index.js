import { combineReducers } from 'redux';

import explorePageReducer from './explorePageReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    explorePageReducer: explorePageReducer,
    authReducer: authReducer,
    errorReducer: errorReducer
});