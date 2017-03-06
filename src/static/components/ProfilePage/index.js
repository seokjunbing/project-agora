
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Segment, Label, Header, Icon, Table, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import EditListing from '../EditListing';
import * as actionCreators from '../../actions/userlistings';
import * as editActionCreators from '../../actions/editlisting';
import * as closeActionCreators from '../../actions/closelisting';
import ListingModal from '../ListingModal';


class ProfilePage extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        emailAddress: '',
        firstName: '',
        lastName: '',
        justClosed : false,
      };
  }

  componentWillMount(){

    const { user_id } = this.props.user;
    const { auth_token } = this.props.user;

    // return the user email, first name and last name
    var self = this;
    var promiseObj = getUserInfo(user_id, auth_token);
    promiseObj.then(function(resp){
      self.setState({emailAddress : resp.data.email, firstName : resp.data.first_name, lastName : resp.data.last_name});
    });

  }

  componentDidMount() {
      this.props.actions.fetchUserListings();
      this.setState({editModal : false});
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

  closeListing(id) {
    console.log('Closing listing number: ');
    console.log(id);
    this.setState({justClosed : false});
    this.props.closeActions.closeListing(this.props.userlistings.listings[id].id);
  }

  renderUserListingRows() {
    var style1 = {
        padding: '0px',
    }

    if (this.props.userlistings && this.props.userlistings.listings && this.props.userlistings.listings.length > 0) {
      return (
        this.props.userlistings.listings.map((listing, i) => {

          console.log(listing);
          if (listing.closed == false) {
            return (
              <Table.Row>
                <Table.Cell>
                  <ListingModal trigger={<Segment style={style1} basic>{listing.title}</Segment>} listing={listing} user_id={this.props.user}/>
                </Table.Cell>
                <Table.Cell>
                  <ListingModal trigger={<Segment style={style1} basic>${listing.price}</Segment>} listing={listing} user_id={this.props.user}/>
                </Table.Cell>
                <Table.Cell>
                  <ListingModal trigger={<Segment style={style1} basic>{listing.listing_date}</Segment>} listing={listing} user_id={this.props.user}/>
                </Table.Cell>
                <Table.Cell>
                  <Button basic fluid icon onClick={() => this.editListing(i)}><Icon name='edit' color='blue' /></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button basic fluid icon onClick={() => this.closeListing(i)}><Icon name='checkmark' color='green' /></Button>
                </Table.Cell>
              </Table.Row>

            );
          } else {
            return (
              <Table.Row disabled>
                <Table.Cell>
                  <ListingModal trigger={<Segment style={style1} basic>{listing.title}</Segment>} listing={listing} user_id={this.props.user}/>
                </Table.Cell>
                <Table.Cell>
                  <ListingModal trigger={<Segment style={style1} basic>{listing.price}</Segment>} listing={listing} user_id={this.props.user}/>
                </Table.Cell>
                <Table.Cell>
                  <ListingModal trigger={<Segment style={style1} basic>{listing.listing_date}</Segment>} listing={listing} user_id={this.props.user}/>
                </Table.Cell>
                <Table.Cell>
                  <Button basic fluid icon onClick={() => this.editListing(i)}><Icon name='edit' /></Button>
                </Table.Cell>
                <Table.Cell>
                  <Button basic fluid icon onClick={() => this.closeListing(i)}><Icon name='checkmark' /></Button>
                </Table.Cell>
              </Table.Row>

            );
          }

      }));
    } else {
      return (
        <div>
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </div>
      );
    }
  }

  renderUserListings() {
    if (this.props && this.props.closeListing) {
      if (this.state) {
        if (this.props.closeListing.justClosed && this.state.justClosed == false) {
          this.props.actions.fetchUserListings();
          this.setState({justClosed : true});
        }
      }
    }

    var style1 = {
        width: '60%',
    }

    var style2 = {
        width: '20%',
    }

    var style3 = {
        width: '10%',
    }


    return (
      <div>

        <Grid>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={10}>
            <Table size='mini' celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell >Title</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell>Listing Date</Table.HeaderCell>
                  <Table.HeaderCell style={style3}>Edit</Table.HeaderCell>
                  <Table.HeaderCell style={style3}>Close Listing</Table.HeaderCell>
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
    closeListing : state.closeListing,

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
