import { createReducer } from '../utils';
import {
    SET_FILTER,
    CLEAR_FILTERS,
} from '../constants';

const initialState = {
    min_price: null,
    max_price: null,
    price_type: null,
    sale_type: null,
    category__name: '',
};

export default createReducer(initialState, {
    [SET_FILTER]: (state, payload) => {
        return Object.assign({}, state, {
            [payload.name]: payload.val,
        });
    },
    [CLEAR_FILTERS]: (state, payload) => {
        return Object.assign({}, state, {
            min_price: null,
            max_price: null,
            price_type: null,
            sale_type: null,
            category__name: null
        });
    },
});
