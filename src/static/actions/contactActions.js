import axios from 'axios';
import { browserHistory } from 'react-router';
import { SET_FEEDBACK } from '../constants';


// function that posts the data to the api and responds to successful completion
export function adminContactRequest(userData){
  return dispatch => {
    axios.post('/api/contact/', {
      email: userData.userEmail,
      name: userData.userName,
      title: userData.issueTitle,
      content: userData.issueText
    })
    .then(response => {

      // set the message to prompt the user to verify its email
      dispatch({type: SET_FEEDBACK, payload: "Thank you for contacting us!"});

      // take the person to the main page
      browserHistory.push('/about');
    })
    .catch(error => {

      // in case of error tell the user
      dispatch({type: SET_FEEDBACK, payload: "Oooops! Something went wrong!"});

      // take the person to the main page
      browserHistory.push('/about');

    });
  }
}
