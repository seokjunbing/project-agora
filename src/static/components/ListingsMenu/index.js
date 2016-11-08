import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import CategoryDropdown from '../CategoryDropdown';

class ListingsMenu extends React.Component {
    render() {
        var style = { marginBottom: '20px', }
        return (
            <div style={style}>
                <Menu>
                    <Menu.Item>
                        <CategoryDropdown/>
                    </Menu.Item>
                    <Menu.Item>
                        <Button>Clear Filters</Button>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default(ListingsMenu);
