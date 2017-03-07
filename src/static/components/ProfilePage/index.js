
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Segment, Label, Header, Icon, Table, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import EditListing from '../EditListing';
import * as actionCreators from '../../actions/userlistings';
import * as editActionCreators from '../../actions/editlisting';
import * as closeActionCreators from '../../actions/toggleListing';
import ListingModal from '../ListingModal';


class ProfilePage extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        emailAddress: '',
        firstName: '',
        lastName: '',
        shouldUpdate: false,
      };
  }

  componentWillMount(){

    const { user_id } = this.props.user;
    const { auth_token } = this.props.user;

    // return the user email, first name and last name
    var self = this;
    var promiseObj = getUserInfo(user_id, auth_token);
    promiseObj.then(function(resp){
      self.setState({emailAddress : resp.data.email, firstName : resp.data.first_name, lastName : resp.data.last_name}, function() { console.log(this.state);});
    });

  }

  componentDidMount() {
      this.props.actions.fetchUserListings();
      this.setState({editModal : false});
  }

  componentWillUpdate(nextProps, nextState) {
      if(nextProps.toggleListing.toggled && nextState.shouldUpdate) {
          this.props.actions.fetchUserListings();
          this.setState({ shouldUpdate: false });
      }
  }

  editModalOpen = (e) => this.setState({editModal : true});
  editModalClose = (e) => this.setState({editModal : false});


  processUserListings() {
      if (!this.props.listings) {
          return ([]);
      } else {
          return (this.props.listings);
      }
  }


  editListing(i) {
    this.props.editActions.setEditListing(this.props.userlistings.listings[i]);
    browserHistory.push('/edit');
  }

  toggleListing(id) {
      this.setState({ shouldUpdate: true});
    this.props.closeActions.toggleListing(this.props.userlistings.listings[id].id);
  }

  formatDate(date) {
      var date = new Date(date);
      var dateFormat = require('dateformat');
      return dateFormat(date, "mmmm dS, yyyy");
  }

  closingString(date) {
      return 'Closed on ' + this.formatDate(date);
  }

  renderUserListingRows() {
    var style1 = {
        padding: '0px',
    }

    var style2 = {
        padding: '0px',
        cursor: 'pointer',
        color: '#00B5AD',
    }

    var style3 = {
        color: 'green',
    }

    var style4 = {
        color: 'red',
    }

      return (
        this.props.userlistings.listings.map((listing, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell>
                  <ListingModal trigger={<Segment style={style2} basic>{listing.title}</Segment>} listing={listing} user_id={this.props.user}/>
                </Table.Cell>
                <Table.Cell>
                  <Segment style={style1} basic>${listing.price}</Segment>
                </Table.Cell>
                <Table.Cell>
                  <Segment style={style1} basic>{this.formatDate(listing.listing_date)}</Segment>
                </Table.Cell>
                <Table.Cell>
                  <Button basic fluid icon onClick={() => this.editListing(i)}><Icon name='edit' color='blue' /></Button>
                </Table.Cell>
                <Table.Cell>
                  <Segment style={style1} basic>{listing.closed ? this.closingString(listing.closing_date) : 'Open'}</Segment>
                </Table.Cell>
                <Table.Cell>
                    <Button basic fluid icon onClick={() => this.toggleListing(i)}>{listing.closed ? <p style={style3}>Open</p> : <p style={style4}>Close</p>}</Button>
                </Table.Cell>
              </Table.Row>
          );
      }));
  }

  renderUserListings() {

    var style1 = {
        width: '60%',
    }

    var style2 = {
        width: '20%',
    }

    var style3 = {
        width: '10%',
    }

    var style4 = {
        textAlign: 'center',
        paddingTop: '10px',
    }

    return (

      <div>
      {(this.props.userlistings && this.props.userlistings.listings && this.props.userlistings.listings.length > 0) &&
        <Grid>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={10}>
            <Table size='small' celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell >Title</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Listing Date</Table.HeaderCell>
                  <Table.HeaderCell style={style3}>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell style={style3}>Change Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.renderUserListingRows()}
              </Table.Body>
            </Table>

          </Grid.Column>
          <Grid.Column width={3}>
          </Grid.Column>

        </Grid>
    }
    {!(this.props.userlistings && this.props.userlistings.listings && this.props.userlistings.listings.length > 0) && <h3 style={style4}>You have not published any listings.</h3>}
      </div>
    )
  }


  render() {

      var center_style = {
        textAlign: 'center'
      }

      var button_style = {
        marginTop: '5px',
        textAlign: 'center'
      }

      return (
        <Segment raised style={center_style} padded='very' size='big'>
          <Header as='h2'>{this.state.firstName} {this.state.lastName}</Header>
          <p>{this.state.emailAddress}</p>
          {this.renderUserListings()}
        </Segment>
      );
    }
}

// get the user Data
function getUserInfo(id, tok){
  return axios.get('/api/users/' + id + '/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + tok,
    }
  });
}

// get the user
const mapStateToProps = (state) => {
  return {
    user: state.user,
    userlistings : state.userlistings,
    toggleListing : state.toggleListing,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch,
      actions: bindActionCreators(actionCreators, dispatch),
      editActions: bindActionCreators(editActionCreators, dispatch),
      closeActions: bindActionCreators(closeActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
