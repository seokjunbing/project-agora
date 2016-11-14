import React, { Component } from 'react';
import * as actionCreators from '../../../actions/postlisting';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

const price_units = [
  { text: 'fixed', value: 'f' },
  { text: '/hr', value: 'h' },
  { text: '/week', value: 'w' },
  { text: '/term', value: 't' },
];

const products = [
  { text: 'Hat', value: 'hat' },
  { text: 'Scarf', value: 'scarf' },
  { text: 'Jacket', value: 'jacket' },
  { text: 'T-Shirt', value: 't_shirt' },
  { text: 'Gloves', value: 'gloves' },
  { text: 'Watch', value: 'watch' },
  { text: 'Belt', value: 'belt' },
  { text: 'Pants', value: 'pants' },
  { text: 'Shoes', value: 'shoes' },
  { text: 'Socks', value: 'socks' },
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
    this.props.actions.postListing(serializedForm);
    console.log("hey there");
  }

  render() {
    const { serializedForm, value } = this.state
    return (

      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group widths='equal'>
          <Form.Input label='Price' name='price' placeholder='$50' />
          <Form.Input label='Price Type' name='price_type' placeholder='OT' />
        </Form.Group>
        <Form.TextArea name='description' label='description' placeholder='Anything else we should know?' rows='3' />
        <Form.Group widths='equal'>
          <Form.Input label='Title' name='title' placeholder='e.g. 42 inch LG TV' />
        </Form.Group>

        <Form.Input label='Category' name='category' placeholder='1' />

        <Button primary type='submit'>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
    return {

        isPosting : state.postListing.isPosting,
        categories : state.postListing.postdata,
        statusText : state.postListing.statusText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
