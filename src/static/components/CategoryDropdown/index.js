import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as catActionCreators from '../../actions/categories';
import * as lisActionCreators from '../../actions/listings';

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
        this.props.lisActions.fetchListingsByCategory(selected.name);
    }


    render() {
        return (
            <Dropdown placeholder='Categories' fluid selection onChange={this.filterListings.bind(this)} options={this.processCategories()}/>
        )
      }
    }

const mapStateToProps = (state) => {
    return {
        isFetching : state.categories.isFetching,
        categories : state.categories.categories,
        statusText : state.categories.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        catActions: bindActionCreators(catActionCreators, dispatch),
        lisActions: bindActionCreators(lisActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown);
