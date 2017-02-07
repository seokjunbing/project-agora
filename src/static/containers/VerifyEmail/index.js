import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as signUpActionCreators from '../../actions/signUpActions';
import * as logInActionCreators from '../../actions/logInActions';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import VerifyEmail from '../../components/VerifyEmail';



class VerifyEmailView extends React.Component {

  render() {
      return (
        <div>
          <VerifyEmail userSignupRequest={this.props.signUpActions.userSignupRequest} userLogInRequest={this.props.logInActions.userLogInRequest}/>
        </div>
      );
  }

}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        signUpActions: bindActionCreators(signUpActionCreators, dispatch),
        logInActions: bindActionCreators(logInActionCreators, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(VerifyEmailView);
export { VerifyEmailView as VerifyEmailViewNotConnected };
