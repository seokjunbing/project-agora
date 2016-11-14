import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/auth';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import ListingTile from '../../components/ListingTile';
import ListingWrapper from '../../components/ListingWrapper';

class ListingView extends React.Component {

    render() {
        var style = {
            display: 'block',
            margin: 'auto',
            width: '82.5%',
        }
        return (
            <div style={style}>
                <ListingWrapper/>
            </div>
        );
    }
}

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapDispatchToProps)(ListingView);
export { ListingView as ListingViewNotConnected };
