import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { TOGGLE_LISTING_REQUEST, TOGGLE_LISTING_SUCCESS, TOGGLE_LISTING_FAILURE } from '../constants';

export function toggleListingSuccess(response) {
    return {
        type: TOGGLE_LISTING_SUCCESS,
        payload: {
            response: response,
        }
    };
}

export function toggleListingFailure(error) {
    return {
        type: TOGGLE_LISTING_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function toggleListingRequest() {
    return {
        type: TOGGLE_LISTING_REQUEST
    };
}

export function toggleListing(pk) {
    return (dispatch) => {
        dispatch(toggleListingRequest());
        var token = localStorage.getItem("LOCAL_TOKEN");
        var auth = '';
        if(token != null) {
            auth = 'JWT ' + token;
        }
        return fetch(`${SERVER_URL}/api/listings/${pk}/toggle_listing/`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth,
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if(typeof response !== 'undefined' && response.length > 0){
                    dispatch(toggleListingSuccess(response));
                }
            })
            .catch(error => {
                dispatch(toggleListingFailure(error));
            });
    };
}
