import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filActionCreators from '../../actions/filters';
import { saleTypes } from '../../enums.js';

class SaleTypeDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    filterListings(event, selection) {
        this.props.filActions.setFilter('sale_type', selection.value);
    }

    buildOption(val) {
        var selected = saleTypes.find(x => x.value === val);
        if(selected) {
            return selected.value;
        } else {
            return '';
        }
    }

    render() {
        return (
            <Dropdown placeholder='Sale Types' search selection onChange={this.filterListings.bind(this)} options={saleTypes} value={this.buildOption(this.props.selected)}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selected : state.filters.sale_type,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        filActions: bindActionCreators(filActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleTypeDropdown);
