import {
    FETCHING_USER_SETS_START,
    FETCHING_USER_SETS_SUCCESS,
    FETCHING_ACTIVE_SET_START,
    FETCHING_ACTIVE_SET_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    isCreatingNewSet: false,
    isFetchingUserSets: false,
    isFetchingActiveSet: false,
    activeSet: null,
    userSets: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_USER_SETS_START:
            return {
                ...state,
                isFetchingUserSets: true
            }

        case FETCHING_USER_SETS_SUCCESS:
            return {
                ...state,
                isFetchingUserSets: false,
                userSets: [...action.userSets]
            }

        case FETCHING_ACTIVE_SET_START:
            return {
                ...state,
                isFetchingActiveSet: true
            }
        
        case FETCHING_ACTIVE_SET_SUCCESS:
            return {
                ...state,
                isFetchingActiveSet: false,
                activeSet: {...action.set}
            }

        default:
            return state;
    }
}

export default reducer;