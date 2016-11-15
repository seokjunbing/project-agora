import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filActionCreators from '../../actions/filters';
import { priceTypes } from '../../enums.js';

class PriceTypeDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    filterListings(event, selection) {
        this.props.filActions.setFilter('price_type', selection.value);
    }

    buildOption(val) {
        var selected = priceTypes.find(x => x.value === val);
        if(selected) {
            return selected.value;
        } else {
            return '';
        }
    }

    render() {
        return (
            <Dropdown placeholder='Price Types' search selection onChange={this.filterListings.bind(this)} options={priceTypes} value={this.buildOption(this.props.selected)}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selected : state.filters.price_type,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        filActions: bindActionCreators(filActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceTypeDropdown);
