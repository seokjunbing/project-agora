import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import ListingTile from '../../components/ListingTile';


class ListingView extends React.Component {

    render() {
        return (
          <div>
            <ListingTile/>
          </div>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapDispatchToProps)(ListingView);
export { ListingView as ListingViewNotConnected };
