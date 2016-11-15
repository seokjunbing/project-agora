import React from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';

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
                        <Button href="/verify" color='teal'>Log In</Button>
                      </Menu.Item>
                  </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default (NavBar);
