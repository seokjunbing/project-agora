import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/listings';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import ListingTile from '../../components/ListingTile';
import ListingWrapper from '../../components/ListingWrapper';
import ListingsMenu from '../../components/ListingsMenu';

class ListingView extends React.Component {
    componentDidMount() {
        this.props.actions.fetchListings();
    }

    render() {
        var style1 = {
            display: 'block',
            margin: 'auto',
            width: '82.5%',
        }

        return (
            <div style={style1}>
                <ListingsMenu/>
                {this.props.listings && <ListingWrapper listings={this.props.listings}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching : state.listings.isFetching,
        listings : state.listings.listings,
        statusText : state.listings.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingView);
export { ListingView as ListingViewNotConnected };
