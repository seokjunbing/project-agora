import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Account from '../../components/Account';
import CreateListing from '../../components/CreateListing';


class CreateListingView extends React.Component {

    render() {
        return (
          <div>
            <CreateListing/>
          </div>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};



export default connect(mapDispatchToProps)(CreateListingView);
export { CreateListingView as CreateListingViewNotConnected };
