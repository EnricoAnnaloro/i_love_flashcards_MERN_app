import {
    FETCH_POPULAR_ITEMS_START,
    FETCH_POPULAR_ITEMS_FAIL,
    FETCH_POPULAR_ITEMS_SUCCESS,
    SET_UP_POPULAR_ITEMS
} from '../actions/actionTypes';

const initialState = {
    error: null,
    popularSets: [],
    isFetchingLoading: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_POPULAR_ITEMS_START:
            return {
                ...state,
                isFetchingLoading: true
            }

        case FETCH_POPULAR_ITEMS_FAIL:
            return {
                ...state,
                error: action.error
            }

        case SET_UP_POPULAR_ITEMS:
            return {
                ...state,
                popularSets: action.popularSets,
                isFetchingLoading: false
            }

        default:
            return state
    }
}

export default reducer;