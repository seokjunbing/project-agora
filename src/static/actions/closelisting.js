import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { CLOSE_LISTING_REQUEST, CLOSE_LISTING_SUCCESS, CLOSE_LISTING_FAILURE } from '../constants';

export function closeListingSuccess(response) {
    return {
        type: CLOSE_LISTING_SUCCESS,
        payload: {
            response: response,
        }
    };
}

export function closeListingFailure(error) {
    return {
        type: CLOSE_LISTING_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function closeListingRequest() {
    return {
        type: CLOSE_LISTING_REQUEST
    };
}

export function closeListing(pk) {
    return (dispatch) => {
        dispatch(closeListingRequest());
        var token = localStorage.getItem("LOCAL_TOKEN");
        var auth = '';
        if(token != null) {
            auth = 'JWT ' + token;
        }
        return fetch(`${SERVER_URL}/api/listings/${pk}/close_listing/`, {
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
                    dispatch(closeListingSuccess(response));
                }
            })
            .catch(error => {
                dispatch(closeListingFailure(error));
            });
    };
}
