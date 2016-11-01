import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from '../constants';

export function fetchCategoriesSuccess(categories) {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload: {
            categories
        }
    };
}

export function fetchCategoriesFailure(error) {
    return {
        type: FETCH_CATEGORIES_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function fetchCategoriesRequest() {
    return {
        type: FETCH_CATEGORIES_REQUEST
    };
}

export function fetchCategories() {
    return (dispatch) => {
        dispatch(fetchCategoriesRequest());
        return fetch(`${SERVER_URL}/api/categories/`, {
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
                    dispatch(fetchCategoriesSuccess(response.results));
                }
            })
            .catch(error => {
                dispatch(fetchCategoriesFailure(error));
            });
    };
}
