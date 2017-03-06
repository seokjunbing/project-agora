import { SET_EDIT_LISTING } from '../constants';

export function setEditListing(data) {
    return {
        type: SET_EDIT_LISTING,
        payload: data
    };
}
