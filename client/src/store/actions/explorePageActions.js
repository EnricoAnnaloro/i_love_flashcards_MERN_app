import axios from '../../axiosInstances/axios-api-setup';
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
    const cardsApiURL = "/api/cards";
    const cardSetsApiURL = "/api/cardSets";

    axios.get(cardsApiURL)
        .then(cardRes => {
            const cardsApiResponse = cardRes;

            axios.get(cardSetsApiURL)
                .then(setsRes => {
                    const cardSetsApiResponse = setsRes;

                    // Add here the logic for displaying only the first 100 most popular ones in order

                    dispatch(setUpPopularItems(cardsApiResponse.data, cardSetsApiResponse.data));
                })
                .catch(error => {
                    dispatch(fetchPopularItemsFailed(error));
                })
        })
        .catch(error => {
            dispatch(fetchPopularItemsFailed(error));
        })
}