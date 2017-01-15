import React from 'react';
import { Menu, Input, Button, Popup, Icon, List, Image, Dropdown, Divider, Label } from 'semantic-ui-react';

class NavBar extends React.Component {
    render() {
        var style = {
            marginBottom: '20px'
        }
        return (
            <div style={style}>
                <Menu stackable>
                  <Menu.Item href="/">
                    <h2>AGORA</h2>
                  </Menu.Item>
                  <Menu.Item href="/listing">Listings</Menu.Item>
                  <Menu.Item href="/createlisting">Create Listing</Menu.Item>
                  <Menu.Menu position='right'>
                      <Menu.Item>
                         <Input className='icon' icon='search' placeholder='Search listings...' />
                      </Menu.Item>
                      <Menu.Item>
                          <Popup
                            trigger={ <div><Icon name='mail' /> Messages</div>}
                            content={<List verticalAlign='middle'>
                                        <List.Item>
                                          <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg' />
                                          <List.Content>
                                            <List.Header as='a'>Black leather couch</List.Header>
                                            <List.Header>Unread message...</List.Header>
                                          </List.Content>
                                        </List.Item>
                                        <List.Item>
                                          <Image avatar src='http://semantic-ui.com/images/avatar/small/christian.jpg' />
                                          <List.Content>
                                            <List.Header as='a'>LG 40-in TV</List.Header>
                                            <List.Description>So can we agree on $20?</List.Description>
                                          </List.Content>
                                        </List.Item>
                                        <List.Item>
                                          <Image avatar src='http://semantic-ui.com/images/avatar/small/daniel.jpg' />
                                          <List.Content>
                                            <List.Header as='a'>Air Jordan 10</List.Header>
                                            <List.Description>Thanks for buying from me!</List.Description>
                                          </List.Content>
                                        </List.Item>
                                        <List.Item>
                                          <Button basic color='black'>See all conversations</Button>
                                        </List.Item>
                                      </List>}
                            on='click'
                            positioning='bottom right'
                          />
                      </Menu.Item>
                      <Menu.Item>
                        <Button href="/verify" color='teal'>Log In</Button>
                      </Menu.Item>
                  </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default (NavBar);
