import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import categoriesReducer from './categories';
import listingsReducer from './listings';
import filtersReducer from './filters';
import postListingReducer from './postlisting';
import putListingReducer from './putlisting';
import signUpPromptReducer from './signUpPromptReducer';
import logInReducers from './logInReducers';
import messagingReducer from './messaging';
import userlistingsReducer from './userlistings';
import editListingReducer from './editlisting';
import toggleListingReducer from './toggleListing';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    routing: routerReducer,
    categories: categoriesReducer,
    listings: listingsReducer,
    filters: filtersReducer,
    postListing: postListingReducer,
    putListing: putListingReducer,
    verificationPrompt: signUpPromptReducer,
    user: logInReducers,
    messaging: messagingReducer,
    userlistings: userlistingsReducer,
    editListing: editListingReducer,
    toggleListing: toggleListingReducer,
});
