import { createReducer } from '../utils';
import { SET_EDIT_LISTING } from '../constants';

const initialState = {
    current_listing: null,
};

export default createReducer(initialState, {
    [SET_EDIT_LISTING]: (state, payload) => {
        return {
            current_listing: payload
        };
    }
});
