import { createReducer } from '../utils';
import { EXECUTE_USERLOGIN_REQUEST } from '../constants';

const initialState = {
    tokenAuth : null
};

// put the token into state
export default createReducer(initialState, {
    [EXECUTE_USERLOGIN_REQUEST]: (state, payload) => {
        return {
            tokenAuth: payload
        };
    }
});
