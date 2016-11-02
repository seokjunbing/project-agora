import { createReducer } from '../utils';
import {
    FETCH_LISTINGS_REQUEST,
    FETCH_LISTINGS_SUCCESS,
    FETCH_LISTINGS_FAILURE
} from '../constants';

const initialState = {
    isFetching : false,
    listings : null,
    statusText : ''
};

export default createReducer(initialState, {
    [FETCH_LISTINGS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: null
        });
    },
    [FETCH_LISTINGS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            listings: payload.listings,
            statusText: 'Successfully fetched listings.'
        });
    },
    [FETCH_LISTINGS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            listings: null,
            statusText: `Listings Fetch Error: ${payload.statusText}`
        });
    }
});
