import { createSelector } from 'reselect';
import { SERVER_URL } from '../utils/config';

const getFilters = state => state.filters;

export const buildQueryString = createSelector(
    [ getFilters ],
    (filters) => {
        var qs = "?";
        for(var key in filters) {
            if(filters[key] != null && filters[key] != '') {
                var value = filters[key];
                qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            }
        }
        if (qs.length > 0){
            qs = qs.substring(0, qs.length-1); //chop off last "&"
        }
        return window.location.protocol + '//' + window.location.host + '/api/listings/' + qs;
    }
);
