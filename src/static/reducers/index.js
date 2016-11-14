import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import categoriesReducer from './categories';
import listingsReducer from './listings';
import postListingReducer from './postlisting';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    routing: routerReducer,
    categories: categoriesReducer,
    listings: listingsReducer,
    postListing: postListingReducer,
});
