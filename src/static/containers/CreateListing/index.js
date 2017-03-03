import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Account from '../../components/Account';
import CreateListing from '../../components/CreateListing';
import ErrorPanel from '../../components/ErrorPanel';



class CreateListingView extends React.Component {

    render() {

      const { isAuthenticated } = this.props.user;

        return (
          <div>
            { isAuthenticated ? <CreateListing/> : <ErrorPanel/> }
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
    return {};
};



export default connect(mapStateToProps, mapDispatchToProps)(CreateListingView);
export { CreateListingView as CreateListingViewNotConnected };
