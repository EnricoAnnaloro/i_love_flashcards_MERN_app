import axios from '../../axiosInstances/axios-api-setup';
import {
    FETCH_POPULAR_ITEMS_START,
    FETCH_POPULAR_ITEMS_FAIL,
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

export const setUpPopularItems = popularSets => {
    return {
        type: SET_UP_POPULAR_ITEMS,
        popularSets: popularSets
    }
}

export const fetchPopularItems = () => dispatch => {
    dispatch(fetchPopularItemsStart());
    const cardSetsApiURL = "/api/cardSets";

    axios.get(cardSetsApiURL)
        .then(setsRes => {
            const cardSetsApiResponse = setsRes;

            console.log("fetchPopularItems", cardSetsApiResponse.data.cardSets);

            // TODO - Add here the logic for displaying only the first 100 most popular ones in order

            dispatch(setUpPopularItems(cardSetsApiResponse.data.cardSets));
        })
        .catch(error => {
            dispatch(fetchPopularItemsFailed(error));
        })
}