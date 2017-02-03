import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import VerifyEmail from '../../components/VerifyEmail';
import { userSignupRequest } from '../../actions/signUpActions';
import { userLogInRequest } from '../../actions/logInActions';



class VerifyEmailView extends React.Component {

  render() {

      const { userSignupRequest } = this.props;
      const { userLogInRequest } = this.props;

      return (
        <div>
          <VerifyEmail userSignupRequest={userSignupRequest} userLogInRequest={userLogInRequest}/>
        </div>
      );
  }

}

VerifyEmailView.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  userLogInRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, userLogInRequest })(VerifyEmailView);
export { VerifyEmailView as VerifyEmailViewNotConnected };
