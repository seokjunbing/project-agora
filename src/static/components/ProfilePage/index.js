import axios from 'axios';
import React from 'react';
import { Button, Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
