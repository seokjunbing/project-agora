import React, { Component } from 'react';
import * as postActionCreators from '../../../actions/postlisting';
import * as catActionCreators from '../../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../../CategoryDropdown';
import ReactS3Uploader from 'react-s3-uploader';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

const price_units = [
  { text: 'fixed', value: 'OT' },
  { text: '/month', value: 'MO' },
  { text: '/week', value: 'WE' },
  { text: '/day', value: 'DA' },
  { text: '/term', value: 'PT' },
];

class InputForm extends Component {

  handleTitleChange = (e) => {
      e.preventDefault();
      this.setState({ title : e.target.value })
  }

  handlePriceChange = (e) => {
      e.preventDefault();
      this.setState({ price : e.target.value })
  }

  handlePriceTypeChange = (e, selection) => {
      e.preventDefault();
      this.setState({ price_type : selection.value })
  }

  handleCategoryChange = (e, selection) => {
      e.preventDefault();
      this.setState({ category : selection.value })
  }

  handleDescriptionChange = (e) => {
      e.preventDefault();
      this.setState({ description : e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postActions.postListing(this.state);
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

  onUploadFinish(signResult) {
     this.setState({pictures: signResult.signedUrl.split("?")[0]});
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Input label='Title' name='title' placeholder='e.g. 42 inch LG TV' onChange={this.handleTitleChange.bind(this)}/>
        <Form.Group widths='equal'>
          <Form.Input label='Price' name='price' placeholder='$50' onChange={this.handlePriceChange.bind(this)}/>
          <Form.Field control={Select} label='Price Type' name='price_type' options={price_units} placeholder='fixed' onChange={this.handlePriceTypeChange.bind(this)}/>
        </Form.Group>
        <Form.Field control={Select} label='Category' name='category' options={this.processCategories()} placeholder='select' onChange={this.handleCategoryChange.bind(this)}/>
        <Form.TextArea name='description' label='Description' name='description' placeholder='Anything else we should know?' rows='3' onChange={this.handleDescriptionChange.bind(this)}/>
        <ReactS3Uploader
            signingUrl="/api/get_s3_url"
            accept="image/*"
            onFinish={this.onUploadFinish.bind(this)}/>
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
