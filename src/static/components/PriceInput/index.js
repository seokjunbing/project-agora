import React from 'react';
import { Input, Label } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filActionCreators from '../../actions/filters';
import { priceTypes } from '../../enums.js';

class PriceInput extends React.Component {

    constructor(props) {
        super(props);
    }

    filterListings(event, data) {
        this.props.filActions.setFilter(this.props.filterName, event.target.value);
    }

    buildOption(val) {
        if(val) {
            return val;
        }
        else return '';
    }

    render() {
        return (
            <Input labelPosition='right'>
                <Label basic>$</Label>
                <input type='text' placeholder={this.props.placeholder} onChange={this.filterListings.bind(this)} value={this.buildOption(this.props.filters[this.props.filterName])}/>
            </Input>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters : state.filters,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        filActions: bindActionCreators(filActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceInput);
