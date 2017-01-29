import React, { Component } from 'react';
import { Segment, Image, Grid, Label } from 'semantic-ui-react';
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

const title_length = 20;
const description_length = 40;

var form_status = [0, 0, 1, 0, 0, 0];
var form_touched = [0, 0, 0, 0, 0, 0];

class InputForm extends Component {

  handleTitleChange = (e) => {
      e.preventDefault();
      form_touched[0] = 1;
      if (e.target.value.length < title_length) {
        this.setState({ title : e.target.value });
        form_status[0] = 1;
        console.log(form_status);
      } else {
        form_status[0] = 0;
        console.log(form_status);
      }
  }

  handlePriceChange = (e) => {
      e.preventDefault();
      form_touched[1] = 1;
      if (isNaN(e.target.value) == false) {
        this.setState({ price : e.target.value });
        form_status[1] = 1;
        console.log(form_status);
        console.log(form_touched[1]);
      } else {
        form_status[1] = 0;
        console.log(form_status);
        console.log(form_touched[1]);
      }
  }

  handlePriceTypeChange = (e, selection) => {
      e.preventDefault();
      form_touched[2] = 1;
      this.setState({ price_type : selection.value });
  }

  handleCategoryChange = (e, selection) => {
      e.preventDefault();
      form_touched[3] = 1;
      form_status[3] = 1;
      this.setState({ category : selection.value });
  }

  handleDescriptionChange = (e) => {
      e.preventDefault();
      form_touched[4] = 1;
      if (e.target.value.length < description_length) {
        this.setState({ description : e.target.value });
        form_status[4] = 1;
        console.log(form_status);
      } else {
        form_status[4] = 0;
        console.log(form_status);
      }
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
    form_touched[5] = 1;
    this.setState({pictures: signResult.signedUrl.split("?")[0]});
  }

  titleError() {
      if (form_status[0] == 0 && form_touched[0] == 1) {
        return (<Label basic color='red' pointing>Please enter a shorter title!</Label>);
      } else {
        return (true);
      }
  }

  priceError() {
      if (form_status[1] == 0 && form_touched[1] == 1) {
        return (<Label basic color='red' pointing>Please enter a valid price!</Label>);
      } else {
        return (true);
      }
  }

  descriptionError() {
      if (form_status[4] == 0 && form_touched[4] == 1) {
        return (<Label basic color='red' pointing>Please enter a shorter description!</Label>);
      } else {
        return (true);
      }
  }

  submitActive() {
    var ready = true;
    for (var i = 0; i < form_status.length; i++) {
      if (form_status[i] == 0) {
        ready = false;
      }
    }

    if (ready) {
      return (false);
    } else {
      return (true);
    }
  }

  onImageUploadError(message) {

    console.log('Upload error: ' + message);

  }



  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Input label='Title' name='title' placeholder='e.g. 42 inch LG TV' onChange={this.handleTitleChange.bind(this)}/>
        {this.titleError()}
        <Form.Group widths='equal'>
          <Form.Input label='Price' name='price' placeholder='$50' onChange={this.handlePriceChange.bind(this)}/>
          <Form.Field control={Select} label='Price Type' name='price_type' options={price_units} placeholder='fixed' onChange={this.handlePriceTypeChange.bind(this)}/>
        </Form.Group>
        {this.priceError()}
        <Form.Field control={Select} label='Category' name='category' options={this.processCategories()} placeholder='select' onChange={this.handleCategoryChange.bind(this)}/>
        <Form.TextArea name='description' label='Description' name='description' placeholder='Anything else we should know?' rows='3' onChange={this.handleDescriptionChange.bind(this)}/>
        {this.descriptionError()}
        <ReactS3Uploader
            signingUrl="/api/get_s3_url"
            accept="image/*"
            onError={this.onImageUploadError.bind(this)}
            onFinish={this.onUploadFinish.bind(this)}/>
        <Button color='teal' disabled={this.submitActive()} type='submit'>Submit</Button>

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
