import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
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

class InputForm extends Component {

  handleTitleChange = (e) => {
      e.preventDefault();
      if (e.target.value.length < title_length) {
        this.setState({ title : e.target.value,  titleValid : 1, titleChanged : 1});
      } else {
        this.setState({ titleValid : 0, titleChanged : 1});
      }
  }

  handlePriceChange = (e) => {
      e.preventDefault();
      if (isNaN(e.target.value) == false && ((e.target.value*100 % 1) == 0)) {
        this.setState({ price : e.target.value, priceValid : 1, priceChanged : 1});
      } else {
        this.setState({ priceValid : 0, priceChanged : 1});
      }
  }

  handlePriceTypeChange = (e, selection) => {
      e.preventDefault();
      this.setState({ price_type : selection.value, pricetypeValid : 1, pricetypeChanged : 1});
  }

  handleCategoryChange = (e, selection) => {
      e.preventDefault();
      this.setState({ category : selection.value, categoryValid : 1, categoryChanged : 1});
  }

  handleDescriptionChange = (e) => {
      e.preventDefault();
      if (e.target.value.length < description_length) {
        this.setState({ description : e.target.value, descriptionValid : 1, descriptionChanged : 1});
      } else {
        this.setState({ descriptionValid : 0, descriptionChanged : 1});
      }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
        author: this.props.user,
    }, function() {
        this.props.postActions.postListing(this.state);
        window.location = '/listing';
    });
  }

  componentDidMount() {
      this.props.catActions.fetchCategories();
  }

  componentWillUpdate(nextProps, nextState) {
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


  titleError() {
    if (this.state) {
      if (this.state.titleValid) {
        return (true);

      } else if (this.state.titleChanged) {
        return (<Label basic color='red' pointing>Please enter a shorter title!</Label>);
      }
    } else {
      return (true);
    }
  }

  priceError() {
    if (this.state) {
      if (this.state.priceValid) {
        return (true);
      } else if (this.state.priceChanged) {
        return (<Label basic color='red' pointing>Please enter a valid price!</Label>);
      }
    } else {
      return (true);
    }
  }

  descriptionError() {
    if (this.state) {
      if (this.state.descriptionValid) {
        return (true);
      } else if (this.state.descriptionChanged) {
        return (<Label basic color='red' pointing>Please enter a shorter description!</Label>);
      }
    } else {
      return (true);
    }
  }

  submitActive() {

    if (this.state) {
      if (this.state.titleValid && this.state.priceValid && this.state.pricetypeValid && this.state.categoryValid && this.state.descriptionValid && this.state.imagePresent) {
        return (false);
      } else {
        return (true);
      }
    } return (true);

  }

  removePrimary() {
    if (this.state) {
      if (this.state.images) {
        var images_copy = this.state.images.slice();
        images_copy.shift();
        this.setState({ images : images_copy});
      }
    }
  }

  rotateImageOrder() {
    if (this.state) {
      if (this.state.images) {
        var images_copy = this.state.images.slice();
        var first_image = images_copy.shift();
        images_copy.push(first_image);
        this.setState({images : images_copy});
      }
    }
  }

  onUploadFinish(signResult) {

    this.setState({imageUploadStatus : 2});
    this.setState({imagePresent : 1});

    var images_copy;
    if (this.state.images) {
      images_copy = this.state.images.slice();

    } else {
      images_copy = [];
    }

    images_copy.push(signResult.signedUrl.split("?")[0]);
    this.setState({images:images_copy});
  }

  onImageUploadError(message) {
    this.setState({imageUploadStatus : 3});
  }

  renderPrimaryImage() {
    if (this.state) {
      if (this.state.images && this.state.images.length > 0) {
        var primary = [this.state.images[0]];
        return (
          primary.map((image)=> {
          return (

            <Image fluid src={image}/>
          );
        }));
      } else {
        return (true);
      }
    }
  }

  renderSecondaryImages() {
    if (this.state) {
      if (this.state.images)
        if (this.state.images.length > 1) {
          var images_copy = this.state.images.slice();
          images_copy.shift();
          var secondary = images_copy;
          return (
          secondary.map((image)=> {
            return <Image src={image} />;
          }));
        } else {
          return (true);
      }
    } else {
        return (true);
      }
    }


  onUploadStart(file, next) {
    this.setState({imageUploadStatus : 1});
    next(file);
  }

  onProgress(percent, message) {
    this.setState({imageUploadPercent : percent});
  }

  uploadProgress() {
    if (this.state) {
      if (this.state.imageUploadStatus == 1) {
        return (<Progress percent={this.state.imageUploadPercent} progress />);
      } else if (this.state.imageUploadStatus == 2) {
        return (<Progress percent={100} success>Upload successful!</Progress>);
      } else if (this.state.imageUploadStatus == 3) {
        return (<Progress percent={100} error>There was an error uploading the image</Progress>);
      }
    } else {
      return (true);
    }
  }



  onTitleSelect() {
    this.setState({ titleTouched : 1});
  }

  onPriceSelect() {
    this.setState({ priceTouched : 1});
  }

  onPriceTypeSelect() {
    this.setState({ pricetypeTouched : 1});
  }

  onCategorySelect() {
    this.setState({ categoryTouched : 1});
  }

  onDescriptionSelect() {
    this.setState({ descriptionTouched : 1});
  }

  canRotateOrder() {
    if (this.state) {
      if (this.state.images) {
        if (this.state.images.length > 1) {
          return (false)
        } else {
          return (true)
        }
      } else {
        return (true)
      }
    } else {
      return (true)
    }
  }

  canDelete() {
    if (this.state) {
      if (this.state.images) {
        if (this.state.images.length > 0) {
          return (false)
        } else {
          return (true)
        }
      } else {
        return (true)
      }
    } else {
      return (true)
    }
  }



  render() {
    return (
      <Segment padded='very'>
        <Grid>
          <Grid.Column width={8}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Input label='Title' name='title' placeholder='e.g. 42 inch LG TV' onChange={this.handleTitleChange.bind(this)} onSelect={this.onTitleSelect.bind(this)}/>
              {this.titleError()}
              <Form.Group widths='equal'>
                <Form.Input label='Price' name='price' placeholder='$50' onChange={this.handlePriceChange.bind(this)} onSelect={this.onPriceSelect.bind(this)}/>
                <Form.Field control={Select} label='Price Type' name='price_type' options={price_units} placeholder='fixed' onChange={this.handlePriceTypeChange.bind(this)} onSelect={this.onPriceTypeSelect.bind(this)}/>
              </Form.Group>
              {this.priceError()}
              <Form.Field control={Select} label='Category' name='category' options={this.processCategories()} placeholder='select' onChange={this.handleCategoryChange.bind(this)} onSelect={this.onCategorySelect.bind(this)}/>
              <Form.TextArea name='description' label='Description' name='description' placeholder='Anything else we should know?' rows='3' onChange={this.handleDescriptionChange.bind(this)} onSelect={this.onDescriptionSelect.bind(this)}/>
              {this.descriptionError()}
              {this.uploadProgress()}
              <ReactS3Uploader
                  signingUrl="/api/get_s3_url"
                  accept="image/*"
                  preprocess={this.onUploadStart.bind(this)}
                  onProgress={this.onProgress.bind(this)}
                  onError={this.onImageUploadError.bind(this)}
                  onFinish={this.onUploadFinish.bind(this)}/>
              <Button color='teal' disabled={this.submitActive()} type='submit'>Submit</Button>

            </Form>
          </Grid.Column>
          <Grid.Column width={1}>

          </Grid.Column>
          <Grid.Column width={7}>
            {this.state && this.state.images && this.state.images.length > 0 && <Label color='red' icon='close' attached='top right' onClick={this.removePrimary.bind(this)}>Delete</Label>}
            <Image.Group size='medium' centered='true'>
              {this.renderPrimaryImage()}
            </Image.Group>
            {this.state && this.state.images && this.state.images.length > 1 && <Label color='blue' icon='chevron down' attached='top left' onClick={this.rotateImageOrder.bind(this)}>Rotate Order</Label>}
            <Image.Group size='small' centered='true'>
              {this.renderSecondaryImages()}
            </Image.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isPosting : state.postListing.isPosting,
        categories : state.categories.categories,
        statusText : state.postListing.statusText,
        user : state.user.user_id,
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
