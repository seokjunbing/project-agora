import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { fetchCategories } from '../../actions/listings';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/listings';

class CategoryDropdown extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          isFetching : false,
          categories : null,
          statusText : ''
      };
    }

    componentDidMount() {
        this.props.actions.fetchCategories();
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
    render() {
        return (
            <Dropdown placeholder='Categories' fluid selection options={this.processCategories()}/>
        )
      }
    }

const mapStateToProps = (state) => {
    return {
        isFetching : state.listings.isFetching,
        categories : state.listings.categories,
        statusText : state.listings.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDropdown);
