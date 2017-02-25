import { createReducer } from '../utils';
import { SET_FEEDBACK } from '../constants';

const initialState = {
    promptMessage : ''
};

// put the token into store
export default createReducer(initialState, {
    [SET_FEEDBACK]: (state, payload) => {
        return {
            promptMessage: payload
        };
    }
});
