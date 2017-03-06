import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import EditListing from '../../components/EditListing';
import ErrorPanel from '../../components/ErrorPanel';


class EditListingView extends React.Component {

  // Replace WelcomeBanner with EditListing componentDidMount

  render() {

    const { isAuthenticated } = this.props.user;

      return (
        <div>
          { isAuthenticated ? <EditListing/> : <ErrorPanel/> }
        </div>
      );
  }
}

// get the user from state
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = () => {
    return {};
};



export default connect(mapStateToProps, mapDispatchToProps)(EditListingView);
export { EditListingView as EditListingViewConnected };
