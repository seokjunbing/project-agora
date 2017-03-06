import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_USER_LISTINGS_REQUEST, FETCH_USER_LISTINGS_SUCCESS, FETCH_USER_LISTINGS_FAILURE } from '../constants';

export function fetchUserListingsSuccess(listings) {
    return {
        type: FETCH_USER_LISTINGS_SUCCESS,
        payload: {
            listings: listings,
        }
    };
}

export function fetchUserListingsFailure(error) {
    return {
        type: FETCH_USER_LISTINGS_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function fetchUserListingsRequest() {
    return {
        type: FETCH_USER_LISTINGS_REQUEST
    };
}

export function fetchUserListings() {
    return (dispatch) => {
        dispatch(fetchUserListingsRequest());
        var token = localStorage.getItem("LOCAL_TOKEN");
        var auth = '';
        if(token != null) {
            auth = 'JWT ' + token;
        }
        return fetch(`${SERVER_URL}/api/listings/get_for_user/`, {
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
                    dispatch(fetchUserListingsSuccess(response));
                }
            })
            .catch(error => {
                dispatch(fetchUserListingsFailure(error));
            });
    };
}
