import React from 'react';
import ProfilePage from '../../components/ProfilePage';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import { SET_FEEDBACK } from '../../constants';
import * as logInActionCreators from '../../actions/logInActions';
import signUpPromptReducer from '../../reducers/signUpPromptReducer';
import { bindActionCreators } from 'redux';



class ProfilePageView extends React.Component {

  constructor(props){
    super(props);
  }

  // method to restrict access from the profile page if the user is not authenticated
  componentWillMount(){

    // navigate the user away if not authenticated
    const { isAuthenticated } = this.props.user;
    if (!isAuthenticated){
      console.log("not logged in");
      // set the message to prompt the user log in
      this.props.logInActions.setErrorMessage('Log in to see profile page!');

      // take the person to the main page
      browserHistory.push('/');
    }
  }

  render() {
      return (
        <div>
          <ProfilePage/>
        </div>
      );
  }
}

// get the user
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        logInActions: bindActionCreators(logInActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageView);
