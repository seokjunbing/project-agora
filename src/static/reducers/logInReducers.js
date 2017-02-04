import { createReducer } from '../utils';
import { EXECUTE_USERLOGIN_REQUEST } from '../constants';
import jwt from 'jsonwebtoken';


const initialState = {
    tokenAuth : null,
    email: null,
    user_id: null
};

// put the token into state
export default createReducer(initialState, {
    [EXECUTE_USERLOGIN_REQUEST]: (state, payload) => {
        return {
            auth_token: payload,
            email: jwt.decode(payload).email,
            user_id: jwt.decode(payload).user_id
        };
    }
});
