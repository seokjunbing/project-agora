import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import VerifyEmail from '../../components/VerifyEmail';
import { userSignupRequest } from '../../actions/signUpActions';


class VerifyEmailView extends React.Component {

  render() {

      const { userSignupRequest } = this.props;

      return (
        <div>
          <VerifyEmail userSignupRequest={userSignupRequest}/>
        </div>
      );
  }

}

VerifyEmailView.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest })(VerifyEmailView);
export { VerifyEmailView as VerifyEmailViewNotConnected };
