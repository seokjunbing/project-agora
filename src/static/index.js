import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';
import { authLoginUserSuccess } from './actions/auth';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { LOCAL_TOKEN } from './constants';
import { setCurrentUser } from './actions/logInActions';



const target = document.getElementById('root');

const store = configureStore(window.INITIAL_STATE, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

// set the auth token in state if it is already in local storage
if (localStorage.LOCAL_TOKEN){
  store.dispatch(setCurrentUser(localStorage.LOCAL_TOKEN));
}

const node = (
    <Root store={store} history={history}/>
);

const token = sessionStorage.getItem('token');
if (token !== null) {
    store.dispatch(authLoginUserSuccess(token));
}

ReactDOM.render(node, target);
