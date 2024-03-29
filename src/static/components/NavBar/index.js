import React from 'react';
import { Menu, Input, Button, Popup, Icon, List, Image, Dropdown, Divider, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import logInReducers from '../../reducers/logInReducers';
import { bindActionCreators } from 'redux';
import * as messagingActionCreators from '../../actions/messaging';
import * as logInActionCreators from '../../actions/logInActions';
import { numUnreadSelector } from '../../selectors/messaging';


class NavBar extends React.Component {
    componentDidMount() {
        if(this.props.user.user_id) {
            this.props.messagingActions.fetchConversations('/api/conversations/get_for_user/?user=' + this.props.user.user_id.toString());
        }
        var self = this;
        setInterval(function() {
            if(!self.props.isFetching && self.props.user.user_id) {
                self.props.messagingActions.fetchConversations('/api/conversations/get_for_user/?user=' + self.props.user.user_id.toString());
            }
        }, 5000);
    }

    // logout
    onLogOut(e){
      e.preventDefault();
      this.props.logInActions.logout();
      window.location = '/';
    }

    genConvoHash(id) {
        return '/messaging#' + id.toString();
    }

    render() {

        var style = {
            marginBottom: '20px'
        }

        var style2 = {
            fontWeight: 'normal',
        }

        var style3 = {
            fontWeight: 'bold',
        }

        const { isAuthenticated } = this.props.user;

        // conditional links determining what to show when the user is authenticated vs not
        const userLinks = (

          <Menu.Menu position='right'>
              <Popup
                trigger={ <Menu.Item><Icon name='mail' />Messages {this.props.numUnread > 0 && <Label color='red' horizontal>{this.props.numUnread}</Label>}</Menu.Item>}
                content={<div>
                    <List selection divided verticalAlign='middle'>
                            {this.props.conversations != null && this.props.conversations.map((conversation, index) => {
                                if(index <= 4) {
                                    return <List.Item key={conversation.id} href={this.genConvoHash(index)}>
                                              <Image avatar src={conversation.related_listing.images[0]} />
                                              <List.Content>
                                                <List.Header>{conversation.related_listing.title}</List.Header>
                                                <List.Description style={conversation.read_by.indexOf(this.props.user.user_id) != -1 ? style2 : style3}>{conversation.all_messages[conversation.all_messages.length-1] && conversation.all_messages[conversation.all_messages.length-1].text}</List.Description>
                                              </List.Content>
                                            </List.Item>
                                }
                            })}
                            <List.Item>
                              {this.props.conversations && <Button href='/messaging' basic color='black'>See all conversations</Button>}
                              {!this.props.conversations && <p>No conversations.</p>}
                            </List.Item>
                             </List>
                            </div>}
                on='click'
                positioning='bottom left'
              />
              <Menu.Item href="/profile"><Icon name='user icon' />Profile</Menu.Item>
              <Menu.Item>
                <Button onClick={this.onLogOut.bind(this)} color='teal'>Log Out</Button>
              </Menu.Item>
          </Menu.Menu>

        );

        const guestLinks = (

          <Menu.Menu position='right'>
              <Menu.Item>
                <Button href="/verify" color='teal'>Log In / Sign Up</Button>
              </Menu.Item>
          </Menu.Menu>

        );

        return (
            <div style={style}>
                <Menu stackable>
                  <Menu.Item href="/">
                    <h2>AGORA</h2>
                  </Menu.Item>
                  <Menu.Item href="/about">About</Menu.Item>
                  <Menu.Item href="/contactAdmin">Contact Us</Menu.Item>
                  { isAuthenticated && <Menu.Item href="/createlisting">Create Listing</Menu.Item>}
                  { isAuthenticated ? userLinks : guestLinks }
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.messaging.conversations,
    isFetching: state.messaging.isFetching,
    numUnread : numUnreadSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        messagingActions: bindActionCreators(messagingActionCreators, dispatch),
        logInActions: bindActionCreators(logInActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
