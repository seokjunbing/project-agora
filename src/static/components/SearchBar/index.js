import React from 'react';
import { Input, Label } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filActionCreators from '../../actions/filters';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }

    filterListings(event, data) {
        this.props.filActions.setFilter('search', event.target.value);
    }

    buildOption(val) {
        if(val) {
            return val;
        }
        else return '';
    }

    render() {
        return (
            <Input icon='search' iconPosition='left' placeholder={this.props.placeholder} value={this.buildOption(this.props.filters['search'])} onChange={this.filterListings.bind(this)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
