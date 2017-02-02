import axios from 'axios';
import { browserHistory } from 'react-router';
import { SET_FEEDBACK } from '../constants';
import { EXECUTE_USERLOGIN_REQUEST } from '../constants';


// function that posts the data to the api and responds to successful completion
export function userLogInRequest(userData){
  return dispatch => {
    axios.post('/api/token-auth/', {
      username: userData.logInEmail,
      password: userData.logInPassword
    })
    .then(response => {

      // save the authentication token
      dispatch({type: EXECUTE_USERLOGIN_REQUEST, payload: response.data.token});

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
