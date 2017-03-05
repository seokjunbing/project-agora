import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import WelcomeBanner from '../../components/WelcomeBanner';


class AboutUsView extends React.Component {

  render() {
      return (
        <div>
          <WelcomeBanner/>
        </div>
      );
  }
}

const mapDispatchToProps = () => {
    return {};
};



export default connect(mapDispatchToProps)(AboutUsView);
export { AboutUsView as AboutUsViewNotConnected };
