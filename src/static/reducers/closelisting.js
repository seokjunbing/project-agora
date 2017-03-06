import { createReducer } from '../utils';
import {
    CLOSE_LISTING_REQUEST,
    CLOSE_LISTING_SUCCESS,
    CLOSE_LISTING_FAILURE
} from '../constants';

const initialState = {
    isClosing : false,
    justClosed : false,
    statusText : ''
};

export default createReducer(initialState, {
    [CLOSE_LISTING_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isClosing: true,
            justClosed: false,
            statusText: null
        });
    },
    [CLOSE_LISTING_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isClosing: false,
            justClosed: true,
            statusText: 'Successfully closed listing.'
        });
    },
    [CLOSE_LISTING_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isClosing: false,
            justClosed: false,
            statusText: `Close Listing Error: ${payload.statusText}`
        });
    }
});
