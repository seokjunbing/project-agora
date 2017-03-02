import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_LISTINGS_REQUEST, FETCH_LISTINGS_SUCCESS, FETCH_LISTINGS_FAILURE, SET_SELECTED_LISTING } from '../constants';

export function fetchListingsSuccess(listings) {
    return {
        type: FETCH_LISTINGS_SUCCESS,
        payload: {
            listings: listings,
        }
    };
}

export function fetchListingsFailure(error) {
    return {
        type: FETCH_LISTINGS_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function fetchListingsRequest() {
    return {
        type: FETCH_LISTINGS_REQUEST
    };
}

export function setSelectedListing(listing) {
    return {
        type: SET_SELECTED_LISTING,
        payload: {
            listing: listing,
        }
    };
}

export function fetchListings(url) {
    return (dispatch) => {
        dispatch(fetchListingsRequest());
        var token = localStorage.getItem("LOCAL_TOKEN");
        var auth = '';
        if(token != null) {
            auth = 'JWT ' + token;
        }
        return fetch(url, {
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
                if(typeof response.results !== 'undefined' && response.results.length > 0){
                    dispatch(fetchListingsSuccess(response.results));
                }
                else { dispatch(fetchListingsSuccess(null)); }
            })
            .catch(error => {
                dispatch(fetchListingsFailure(error));
            });
    };
}
