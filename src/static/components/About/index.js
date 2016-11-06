import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Container, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/listings';

class About extends React.Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
        this.props.actions.fetchListings();
    }

    processListings() {
        if (!this.props.listings) {
            return [];
        } else {
            return this.props.listings.map(listing => {
                return {text: listing.title, value: listing.id};
            });
        }
    }
    render() {
        return (
          <Dropdown placeholder='All Listings' fluid selection options={this.processListings()}/>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
