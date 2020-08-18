import { combineReducers } from 'redux';

import explorePageReducer from './explorePageReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cardSetReducer from './cardSetReducer'

export default combineReducers({
    explorePageReducer: explorePageReducer,
    authReducer: authReducer,
    errorReducer: errorReducer,
    cardSetReducer: cardSetReducer
});