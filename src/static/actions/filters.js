import { SET_FILTER, CLEAR_FILTERS } from '../constants';

export function setFilter(name, val) {
    return {
        type: SET_FILTER,
        payload: {
            name: name,
            val: val,
        }
    };
}

export function clearFilters() {
    return {
        type: CLEAR_FILTERS,
    };
}
