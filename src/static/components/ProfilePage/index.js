
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Segment, Header, Icon, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import EditListing from '../EditListing';
import * as actionCreators from '../../actions/userlistings';
import * as editActionCreators from '../../actions/editlisting';


class ProfilePage extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        emailAddress: '',
        firstName: '',
        lastName: ''
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

  renderUserListingRows() {
    if (this.props.userlistings && this.props.userlistings.listings && this.props.userlistings.listings.length > 0) {
      return (
        this.props.userlistings.listings.map((listing, i) => {

          console.log(listing);

          return (
            <Table.Row>
              <Table.Cell>{listing.title}</Table.Cell>
              <Table.Cell>{listing.price}</Table.Cell>
              <Table.Cell>{listing.category}</Table.Cell>
              <Table.Cell>

                <Button basic size='small' icon='edit' onClick={() => this.editListing(i)}></Button>

              </Table.Cell>
              <Table.Cell><Button basic size='small' icon='delete'></Button></Table.Cell>
            </Table.Row>

          );
      }));
    } else {
      return (
        <div>
          <Table.Row>
            <Table.Cell>Help!</Table.Cell>
          </Table.Row>
        </div>
      );
    }
  }

  renderUserListings() {
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Close</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderUserListingRows()}
          </Table.Body>
        </Table>
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
    userlistings : state.userlistings
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      dispatch,
      actions: bindActionCreators(actionCreators, dispatch),
      editActions: bindActionCreators(editActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
