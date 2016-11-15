import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import CategoryDropdown from '../CategoryDropdown';
import PriceTypeDropdown from '../PriceTypeDropdown';
import SaleTypeDropdown from '../SaleTypeDropdown';
import PriceInput from '../PriceInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/filters';

class FilterBar extends React.Component {
    clearFilters() {
        this.props.actions.clearFilters();
    }

    render() {
        var style1 = { marginBottom: '20px', };
        return (
            <div style={style1}>
                <Menu stackable>
                    <Menu.Item>
                        <CategoryDropdown/>
                    </Menu.Item>
                    <Menu.Item>
                        <PriceTypeDropdown/>
                    </Menu.Item>
                    <Menu.Item>
                        <SaleTypeDropdown/>
                    </Menu.Item>
                    <Menu.Item>
                        <PriceInput placeholder='Min Price' filterName='min_price'/>
                    </Menu.Item>
                    <Menu.Item>
                        <PriceInput placeholder='Max Price' filterName='max_price'/>
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
