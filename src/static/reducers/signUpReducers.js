import { createReducer } from '../utils';
import { EXECUTE_USERSIGNUP_REQUEST } from '../constants';

const initialState = {
    tokenAuth : null
};

// put the token into state
export default createReducer(initialState, {
    [EXECUTE_USERSIGNUP_REQUEST]: (state, token) => {
        return Object.assign({}, state, {
            tokenAuth: token
        });
    }
});
