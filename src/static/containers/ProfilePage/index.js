import React from 'react';
import ProfilePage from '../../components/ProfilePage';
import ErrorPanel from '../../components/ErrorPanel';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Router } from 'react-router';
import { SET_FEEDBACK } from '../../constants';
import * as logInActionCreators from '../../actions/logInActions';
import * as fetchUserListingsActionCreators from '../../actions/userlistings';
import signUpPromptReducer from '../../reducers/signUpPromptReducer';
import { bindActionCreators } from 'redux';




class ProfilePageView extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    const { isAuthenticated } = this.props.user;

      return (
        <div>
          { isAuthenticated ? <ProfilePage fetchUserListings={this.props.fetchUserListingsActions.fetchUserListings}/> : <ErrorPanel/> }
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
        fetchUserListingsActions: bindActionCreators(fetchUserListingsActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageView);
