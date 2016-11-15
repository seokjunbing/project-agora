import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/listings';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import ListingTile from '../../components/ListingTile';
import ListingWrapper from '../../components/ListingWrapper';
import FilterBar from '../../components/FilterBar';
import { buildQueryString } from '../../selectors/filters';

class ListingView extends React.Component {
    componentDidMount() {
        this.props.actions.fetchListings(this.props.fetchUrl);
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.props.fetchUrl != nextProps.fetchUrl) {
            this.props.actions.fetchListings(nextProps.fetchUrl);
        }
    }

    render() {
        var style1 = {
            display: 'block',
            margin: 'auto',
            width: '82.5%',
        }

        return (
            <div style={style1}>
                <FilterBar/>
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
        fetchUrl: buildQueryString(state),
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
