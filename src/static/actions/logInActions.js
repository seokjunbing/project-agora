import axios from 'axios';
import { browserHistory } from 'react-router';
import { SET_FEEDBACK } from '../constants';
import { EXECUTE_USERLOGIN_REQUEST, EXECUTE_LOGOUT, LOCAL_TOKEN } from '../constants';
import jwt from 'jsonwebtoken';
import { Router } from 'react-router';


// function that posts the data to the api and responds to successful completion
export function userLogInRequest(userData){
  return dispatch => {
    axios.post('/api/token-auth/', {
      username: userData.logInEmail.concat("@dartmouth.edu"),
      password: userData.logInPassword
    })
    .then(response => {

      // save the authentication token in state
      dispatch({type: EXECUTE_USERLOGIN_REQUEST, payload: response.data.token});

      //  and local storage
      localStorage.setItem(LOCAL_TOKEN, response.data.token);

      // set the message to prompt the user to verify its email
      dispatch({type: SET_FEEDBACK, payload: "Logged in!"});

      // take the person to the main page
      browserHistory.push('/');
    })
    .catch(error => {

      // in case of error tell the user
      dispatch({type: SET_FEEDBACK, payload: "Oooops! Login failed! Check your credentials!"});

      // take the person to the main page
      browserHistory.push('/');


    });
  }
}

// just save the user credentials in the state store
// when a token already exists in local storage
export function setCurrentUser(token){
  return {
    type: EXECUTE_USERLOGIN_REQUEST,
    payload: token
  };
}

export function executeLogout(data){
  return {
    type: EXECUTE_LOGOUT,
    payload: data
  };
}

// logout function
export function logout(){
  return dispatch => {
    localStorage.removeItem(LOCAL_TOKEN);
    dispatch(executeLogout('logout'));

    // user is logged out
    dispatch({type: SET_FEEDBACK, payload: "Logged out!"});

    // take the person to the main page
    browserHistory.push('/');
  }
}
