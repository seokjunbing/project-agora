import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { PUT_LISTING_REQUEST, PUT_LISTING_SUCCESS, PUT_LISTING_FAILURE } from '../constants';

export function putListingSuccess(putresponse) {
    return {
        type: PUT_LISTING_SUCCESS,
        payload: {
            putresponse: putresponse,
        }
    };
};

export function putListingFailure(error) {
    return {
        type: PUT_LISTING_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
};

export function putListingRequest(putdata) {
    return {
        type: PUT_LISTING_REQUEST,
        payload: {
            putdata: putdata,
        }
    };
};

export function putListing(putdata, pk) {
    return (dispatch) => {
        dispatch(putListingRequest(putdata));
        var token = localStorage.getItem("LOCAL_TOKEN");
        return fetch(`${SERVER_URL}/api/listings/${pk}/`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },

            body: JSON.stringify(putdata),
        })
            .then(checkHttpStatus)

            .then(parseJSON)
            .then(response => {
                dispatch(putListingSuccess(response));

            })
            .catch(error => {
                dispatch(putListingFailure(error));
            });
    };
};
