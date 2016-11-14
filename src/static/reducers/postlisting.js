import { createReducer } from '../utils';
import {
    POST_LISTING_REQUEST,
    POST_LISTING_SUCCESS,
    POST_LISTING_FAILURE
} from '../constants';

const initialState = {
    isPosting : false,
    postdata : null,
    statusText : ''
};

export default createReducer(initialState, {
    [POST_LISTING_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isPosting: true,
            statusText: 'currently posting listing',
            postdata: payload,
        });
    },
    [POST_LISTING_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isPosting: false,
            postdata: payload.postdata,
            statusText: 'Successfully posted listing.'
        });
    },
    [POST_LISTING_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isPosting: false,
            postdata: null,
            statusText: `Post Listing Error: ${payload.statusText}`
        });
    }
});
