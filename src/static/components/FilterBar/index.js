import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import CategoryDropdown from '../CategoryDropdown';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/filters';

class FilterBar extends React.Component {
    clearFilters() {
        this.props.actions.clearFilters();
    }

    render() {
        var style = { marginBottom: '20px', }
        return (
            <div style={style}>
                <Menu>
                    <Menu.Item>
                        <CategoryDropdown/>
                    </Menu.Item>
                    <Menu.Item>
                        <Button onClick={this.clearFilters.bind(this)}>Clear Filters</Button>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(FilterBar);
