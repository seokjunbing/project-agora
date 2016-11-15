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
                  <Menu.Item>
                     <Input className='icon' icon='search' placeholder='Search listings...' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button href="/verify" primary>Log In</Button>
                  </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default (NavBar);
