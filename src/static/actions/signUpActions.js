import axios from 'axios';
import { browserHistory } from 'react-router';
import { SET_FEEDBACK } from '../constants';


// function that posts the data to the api and responds to successful completion
export function userSignupRequest(userData){
  return dispatch => {
    axios.post('/api/users/', {
      password: userData.passwordSU,
      email: userData.emailAddressSU.concat("@dartmouth.edu"),
      first_name: userData.firstName,
      last_name: userData.lastName
    })
    .then(response => {

      // set the message to prompt the user to verify its email
      dispatch({type: SET_FEEDBACK, payload: "We sent a verification email to you!"});

      // take the person to the main page
      browserHistory.push('/response');
    })
    .catch(error => {

      // in case of error tell the user
      dispatch({type: SET_FEEDBACK, payload: "Oooops! Something went wrong, try again!"});

      // take the person to the main page
      browserHistory.push('/response');


    });
  }
}
