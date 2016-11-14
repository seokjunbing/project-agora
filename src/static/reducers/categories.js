import { createReducer } from '../utils';
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE
} from '../constants';

const initialState = {
    isFetching : false,
    categories : null,
    statusText : ''
};

export default createReducer(initialState, {
    [FETCH_CATEGORIES_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: null
        });
    },
    [FETCH_CATEGORIES_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            categories: payload.categories,
            statusText: 'Successfully fetched categories.'
        });
    },
    [FETCH_CATEGORIES_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            categories: null,
            statusText: `Category Fetch Error: ${payload.statusText}`
        });
    }
});
