import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import CategoryDropdown from '../CategoryDropdown';
import SaleTypeDropdown from '../SaleTypeDropdown';
import PriceInput from '../PriceInput';
import SearchBar from '../SearchBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filActionCreators from '../../actions/filters';
import * as lisActionCreators from '../../actions/listings';
import { buildQueryString } from '../../selectors/filters';

class FilterBar extends React.Component {
    clearFilters() {
        this.props.filActions.clearFilters();
    }

    componentWillUpdate(nextProps, nextState) {
        var cleared = !nextProps.fetchUrl.includes('?');
        if(cleared) {
            this.props.lisActions.fetchListings(nextProps.fetchUrl);
        }
    }

    updateListings() {
        this.props.lisActions.fetchListings(this.props.fetchUrl);
    }

    render() {
        var style1 = { marginBottom: '20px', };
        return (
            <div style={style1}>
                <Menu stackable fluid widths={6}>
                    <Menu.Item>
                        <CategoryDropdown/>
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
                        <SearchBar placeholder='Search listings...'/>
                    </Menu.Item>
                    <Menu.Item>
                        <Button.Group>
                            <Button onClick={this.updateListings.bind(this)} primary>Update</Button>
                            <Button onClick={this.clearFilters.bind(this)}>Clear Filters</Button>
                        </Button.Group>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetchUrl : buildQueryString(state),
        filters: state.filters,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        filActions: bindActionCreators(filActionCreators, dispatch),
        lisActions: bindActionCreators(lisActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
