import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ErrorPage from '../../components/ErrorPage';


class ErrorPageView extends React.Component {

  render() {
      return (
        <div>
          <ErrorPage/>
        </div>
      );
  }
}

const mapDispatchToProps = () => {
    return {};
};



export default connect(mapDispatchToProps)(ErrorPageView);
export { ErrorPageView as ErrorPageViewNotConnected };
