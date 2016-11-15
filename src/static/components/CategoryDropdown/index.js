import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as catActionCreators from '../../actions/categories';
import * as filActionCreators from '../../actions/filters';

class CategoryDropdown extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.catActions.fetchCategories();
    }

    processCategories() {
        if (!this.props.categories) {
            return [];
        } else {
            return this.props.categories.map(category => {
                return { text: category.name, value: category.id };
            });
        }
    }

    filterListings(event, selection) {
        var id = selection.value;
        var selected = this.props.categories.find(x => x.id === id);
        this.props.filActions.setFilter('category__name', selected.name);
    }

    buildOption(name) {
        if(this.props.categories) {
            var selected = this.props.categories.find(x => x.name === name);
            if(selected) {
                return selected.id;
            } else {
                return '';
            }
        }
        else { return ''; }
    }

    render() {
        return (
            <Dropdown placeholder='Categories' search selection onChange={this.filterListings.bind(this)} options={this.processCategories()} value={this.buildOption(this.props.selected)}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching : state.categories.isFetching,
        categories : state.categories.categories,
        statusText : state.categories.statusText,
        selected : state.filters.category__name,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        catActions: bindActionCreators(catActionCreators, dispatch),
        filActions: bindActionCreators(filActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown);
