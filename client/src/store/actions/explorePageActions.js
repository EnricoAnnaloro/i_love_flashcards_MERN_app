import axios from 'axios';
import {
    FETCH_POPULAR_ITEMS,
    FETCH_POPULAR_ITEMS_START,
    FETCH_POPULAR_ITEMS_FAIL,
    FETCH_POPULAR_ITEMS_SUCCESS,
    SET_UP_POPULAR_ITEMS
} from './actionTypes';

export const fetchPopularItemsStart = () => {
    return {
        type: FETCH_POPULAR_ITEMS_START,
    }
}

export const fetchPopularItemsFailed = error => {
    return {
        type: FETCH_POPULAR_ITEMS_FAIL,
        error: error
    }
}

export const setUpPopularItems = (popularCards, popularSets) => {
    return {
        type: SET_UP_POPULAR_ITEMS,
        popularCards: popularCards,
        popularSets: popularSets
    }
}

export const fetchPopularItems = () => dispatch => {
    dispatch(fetchPopularItemsStart());
    const cardsApiURL = "http://localHost:5000/api/cards";
    const cardSetsApiURL = "http://localHost:5000/api/cardSets";

    const cardsApiRequest = axios.get(cardsApiURL);
    const cardSetsApiRequest = axios.get(cardSetsApiURL);

    axios.all([cardsApiRequest, cardSetsApiRequest])
        .then(axios.spread((...responses) => {
            const cardsApiResponse = responses[0];
            const cardSetsApiResponse = responses[1];

            // Add here the logic for displaying only the first 100 most popular ones in order

            dispatch(setUpPopularItems(cardsApiResponse.data, cardSetsApiResponse.data));
        }))
        .catch(error => {
            dispatch(fetchPopularItemsFailed(error));
        })
}