import { createReducer } from '../utils';
import {
    PUT_LISTING_REQUEST,
    PUT_LISTING_SUCCESS,
    PUT_LISTING_FAILURE
} from '../constants';

const initialState = {
    isPutting : false,
    putdata : null,
    statusText : ''
};

export default createReducer(initialState, {
    [PUT_LISTING_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isPutting: true,
            statusText: 'currently putting listing',
            putdata: payload,
        });
    },
    [PUT_LISTING_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isPutting: false,
            putdata: payload.putdata,
            statusText: 'Successfully put listing.'
        });
    },
    [PUT_LISTING_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isPutting: false,
            putdata: null,
            statusText: `Put Listing Error: ${payload.statusText}`
        });
    }
});
