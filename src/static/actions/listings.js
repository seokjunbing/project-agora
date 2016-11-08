import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
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

export function fetchListings() {
    return (dispatch) => {
        dispatch(fetchListingsRequest());
        return fetch(`${SERVER_URL}/api/listings/`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if(typeof response.results !== 'undefined' && response.results.length > 0){
                    dispatch(fetchListingsSuccess(response.results));
                }
            })
            .catch(error => {
                dispatch(fetchListingsFailure(error));
            });
    };
}

export function fetchListingsByCategory(category) {
    return (dispatch) => {
        dispatch(fetchListingsRequest());
        return fetch(`${SERVER_URL}/api/listings/c/${category}/`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if(typeof response.results !== 'undefined' && response.results.length > 0){
                    dispatch(fetchListingsSuccess(response.results));
                }
            })
            .catch(error => {
                dispatch(fetchListingsFailure(error));
            });
    };
}
