import { createReducer } from '../utils';
import {
    FETCH_USER_LISTINGS_REQUEST,
    FETCH_USER_LISTINGS_SUCCESS,
    FETCH_USER_LISTINGS_FAILURE
} from '../constants';

const initialState = {
    isFetching : false,
    listings : null,
    statusText : ''
};

export default createReducer(initialState, {
    [FETCH_USER_LISTINGS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: null
        });
    },
    [FETCH_USER_LISTINGS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            listings: payload.listings,
            statusText: 'Successfully fetched categories.'
        });
    },
    [FETCH_USER_LISTINGS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            listings: null,
            statusText: `Category Fetch Error: ${payload.statusText}`
        });
    }
});
