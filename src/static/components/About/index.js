import React from 'react';
import { Dropdown, Segment, List } from 'semantic-ui-react';
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

    selectListing(event, selection) {
        var id = selection.value;
        var selected = this.props.listings.find(x => x.id === id);
        this.props.actions.setSelectedListing(selected);
    }

    render() {
        return (
            <div>
              <Dropdown placeholder='All Listings' fluid selection onChange={this.selectListing.bind(this)} options={this.processListings()}/>
              {this.props.selectedListing &&
                  <Segment>
                      <List>
                        <List.Item>{this.props.selectedListing.title}</List.Item>
                        <List.Item>{this.props.selectedListing.description}</List.Item>
                        <List.Item>${this.props.selectedListing.price}</List.Item>
                      </List>
                  </Segment>
              }
            </div>

        )
      }
    }

const mapStateToProps = (state) => {
    return {
        isFetching : state.listings.isFetching,
        listings : state.listings.listings,
        statusText : state.listings.statusText,
        selectedListing : state.listings.selectedListing,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
