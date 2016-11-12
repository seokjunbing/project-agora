import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import VerifyEmail from '../../components/VerifyEmail';


class VerifyEmailView extends React.Component {

  render() {
      return (
        <div>
          <VerifyEmail/>
        </div>
      );
  }
}

const mapDispatchToProps = () => {
    return {};
};



export default connect(mapDispatchToProps)(VerifyEmailView);
export { VerifyEmailView as VerifyEmailViewNotConnected };
