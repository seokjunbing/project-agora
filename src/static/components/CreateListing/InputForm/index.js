import React, { Component } from 'react';
import * as postActionCreators from '../../../actions/postlisting';
import * as catActionCreators from '../../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../../CategoryDropdown';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

const price_units = [
  { text: 'fixed', value: 'OT' },
  { text: '/month', value: 'MO' },
  { text: '/week', value: 'WE' },
  { text: '/day', value: 'DA' },
  { text: '/term', value: 'PT' },
];

class InputForm extends Component {

  state = { serializedForm: {
    "price" : "0",
    "price_type" : "OT",
    "sale_type" : "SA",
    "description" : " ",
    "title" : " ",
    "pictures" : null,
    "flags" : "0",
    "views" : "0",
    "number_of_inquiries" : "0",
    "categories" : "1",
  }};

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = (e, serializedForm, title, description, price, price_type, pictures, category) => {
    e.preventDefault();
    this.props.postActions.postListing(serializedForm);
    window.location = '/listing';
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

  render() {
    const { serializedForm, value } = this.state
    return (

      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Input label='Title' name='title' placeholder='e.g. 42 inch LG TV' />
        <Form.Group widths='equal'>
          <Form.Input label='Price' name='price' placeholder='$50' />
          <Form.Field control={Select} label='Price Type' name='price_type' options={price_units} placeholder='fixed' />
        </Form.Group>
        <Form.Field control={Select} label='Category' name='category' options={this.processCategories()} placeholder='select' />
        <Form.TextArea name='description' label='Description' name='description' placeholder='Anything else we should know?' rows='3' />

        <Button color='teal' type='submit'>Submit</Button>

      </Form>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isPosting : state.postListing.isPosting,
        categories : state.categories.categories,
        statusText : state.postListing.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        postActions: bindActionCreators(postActionCreators, dispatch),
        catActions: bindActionCreators(catActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
