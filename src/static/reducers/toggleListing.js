import { createReducer } from '../utils';
import {
    TOGGLE_LISTING_REQUEST,
    TOGGLE_LISTING_SUCCESS,
    TOGGLE_LISTING_FAILURE
} from '../constants';

const initialState = {
    toggled : false,
    statusText : ''
};

export default createReducer(initialState, {
    [TOGGLE_LISTING_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            toggled: false,
            statusText: null
        });
    },
    [TOGGLE_LISTING_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            toggled: true,
            statusText: 'Successfully closed listing.'
        });
    },
    [TOGGLE_LISTING_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            toggled: false,
            statusText: `Close Listing Error: ${payload.statusText}`
        });
    }
});
