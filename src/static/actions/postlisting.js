import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { POST_LISTING_REQUEST, POST_LISTING_SUCCESS, POST_LISTING_FAILURE } from '../constants';

export function postListingSuccess(postresponse) {
    return {
        type: POST_LISTING_SUCCESS,
        payload: {
            postresponse: postresponse,
        }
    };
};

export function postListingFailure(error) {
    return {
        type: POST_LISTING_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
};

export function postListingRequest(postdata) {
    return {
        type: POST_LISTING_REQUEST,
        payload: {
            postdata: postdata,
        }
    };
};

export function postListing(postdata) {
    return (dispatch) => {
        dispatch(postListingRequest(postdata));
        var token = localStorage.getItem("LOCAL_TOKEN");
        return fetch(`${SERVER_URL}/api/listings/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },

            body: JSON.stringify(postdata),
        })
            .then(checkHttpStatus)

            .then(parseJSON)
            .then(response => {
                dispatch(postListingSuccess(response));

            })
            .catch(error => {
                dispatch(postListingFailure(error));
            });
    };
};
