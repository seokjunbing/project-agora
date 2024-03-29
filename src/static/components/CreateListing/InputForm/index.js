import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import * as postActionCreators from '../../../actions/postlisting';
import * as catActionCreators from '../../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../../CategoryDropdown';
import ImageTile from './ImageTile';
import ReactS3Uploader from 'react-s3-uploader';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

const price_units = [
  { text: 'fixed', value: 'OT' },
  { text: '/month', value: 'MO' },
  { text: '/week', value: 'WE' },
  { text: '/day', value: 'DA' },
  { text: '/term', value: 'PT' },
];

const title_length = 100;
const description_length = 1000;
const max_price = 9999.99;

class InputForm extends Component {

  constructor(props) {
    super(props);
    this.deleteImage = this.deleteImage.bind(this);
    this.makePrimary = this.makePrimary.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.storeImageSize = this.storeImageSize.bind(this);
    this.state = {image_dimensions : []};
  }

  storeImageSize(img_width, img_height, id) {
    if (this.state) {
      var dim_copy = this.state.image_dimensions;
      if (this.state.image_dimensions.length == id) {
        dim_copy[id] = [img_height, img_width];
        this.setState({image_dimensions : dim_copy});
      }
    }
  }


  deleteImage(id) {
    if (this.state) {
      if (this.state.images && this.state.image_captions && this.state.image_dimensions) {
        var images_copy = this.state.images.slice();
        var image_captions_copy = this.state.image_captions.slice();
        var dim_copy = this.state.image_dimensions.slice();
        images_copy.splice(id,1);
        image_captions_copy.splice(id,1);
        dim_copy.splice(id,1);
        this.setState({ images : images_copy, image_captions : image_captions_copy, image_dimensions : dim_copy});
      }
    }
  }

  makePrimary(id) {
    if (this.state) {
      if (this.state.images && this.state.image_captions && this.state.image_dimensions) {
        if (id > 0) {
          var images_copy = this.state.images.slice();
          var image_captions_copy = this.state.image_captions.slice();
          var dim_copy = this.state.image_dimensions.slice();
          var star_img = images_copy[id];
          var star_title = image_captions_copy[id];
          var star_dims = dim_copy[id];
          images_copy.splice(id,1);
          image_captions_copy.splice(id,1);
          dim_copy.splice(id,1);
          images_copy.unshift(star_img);
          image_captions_copy.unshift(star_title);
          dim_copy.unshift(star_dims);
          this.setState({images : images_copy, image_captions : image_captions_copy, image_dimensions : dim_copy});
        }
      }
    }
  }

  onTitleChange(id, text) {
    var image_captions_copy = this.state.image_captions.slice();
    image_captions_copy[id] = text;
    this.setState({ image_captions : image_captions_copy});
  }

  handleTitleChange = (e) => {
      e.preventDefault();
      if (e.target.value.length < title_length && e.target.value.length > 0) {
        this.setState({ title : e.target.value,  titleValid : 1, titleChanged : 1, titlePresent : 1});
      } else if (e.target.value.length > 0) {
        this.setState({ titlePresent : 1, titleValid : 0, titleChanged : 1});
      } else {
        this.setState({ title : e.target.value, titlePresent : 0, titleValid : 0, titleChanged : 1});
      }
  }

  handlePriceChange = (e) => {
      e.preventDefault();
      if (isNaN(e.target.value) == false && (e.target.value < max_price) && ((e.target.value*100 % 1) == 0) && e.target.value.length > 0) {
        this.setState({ price : e.target.value, priceValid : 1, priceChanged : 1, pricePresent : 1});
      } else if (e.target.value.length > 0) {
        this.setState({ pricePresent : 1, priceValid : 0, priceChanged : 1});
      } else {
        this.setState({ price : e.target.value, pricePresent : 0, priceValid : 0, priceChanged : 1});
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
      if (e.target.value.length < description_length && e.target.value.length > 0) {
        this.setState({ descriptionPresent : 1, description : e.target.value, descriptionValid : 1, descriptionChanged : 1});
      } else if (e.target.value.length > 0){
        this.setState({ descriptionPresent : 1, descriptionValid : 0, descriptionChanged : 1});
      } else {
        this.setState({ descriptionPresent : 0, descriptionValid : 0, descriptionChanged : 1, description : e.target.value});
      }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
        author: this.props.user,
    }, function() {
        this.props.postActions.postListing(this.state);
        window.location = '/';
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

      } else if (this.state.titleChanged && this.state.titlePresent) {
        return (<Label basic color='red' pointing>Please enter a shorter title!</Label>);
      }
    } else {
      return (true);
    }
  }

  titleMissing() {
    if (this.state) {
      if (this.state.titlePresent) {
        return (true);
      } else if (this.state.titleChanged) {
        return (<Label basic color='red' pointing>Please enter a title!</Label>);
      }
    } else {
      return (true);
    }
  }

  priceError() {
    if (this.state) {
      if (this.state.priceValid) {
        return (true);
      } else if (this.state.priceChanged && this.state.pricePresent) {
        return (<Label basic color='red' pointing>Please enter a valid price!</Label>);
      }
    } else {
      return (true);
    }
  }

  priceMissing() {
    if (this.state) {
      if (this.state.pricePresent) {
        return (true);
      } else if (this.state.priceChanged) {
        return (<Label basic color='red' pointing>Please enter a price!</Label>);
      }
    } else {
      return (true);
    }
  }

  descriptionError() {
    if (this.state) {
      if (this.state.descriptionValid) {
        return (true);
      } else if (this.state.descriptionChanged && this.state.descriptionPresent) {
        return (<Label basic color='red' pointing>Please enter a shorter description!</Label>);
      }
    } else {
      return (true);
    }
  }

  descriptionMissing() {
    if (this.state) {
      if (this.state.descriptionPresent) {
        return (true);
      } else if (this.state.descriptionChanged) {
        return (<Label basic color='red' pointing>Please enter a description!</Label>);
      }
    } else {
      return (true);
    }
  }

  submitActive() {

    if (this.state) {
      if (this.state.titleValid && this.state.priceValid && this.state.pricetypeValid && this.state.categoryValid && this.state.descriptionValid && this.state.image_dimensions) {
        if (this.state.images && this.state.images.length > 0) {
          return (false);
        } else {
          return (true);
        }
      } else {

        return (true);
      }
    } return (true);

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

    var image_captions_copy;
    if (this.state.image_captions) {
      image_captions_copy = this.state.image_captions.slice();
    } else {
      image_captions_copy = [];
    }

    image_captions_copy.push('');
    this.setState({image_captions:image_captions_copy});

  }

  onImageUploadError(message) {
    this.setState({imageUploadStatus : 3});
  }

  renderPrimaryImage() {
    if (this.state) {
      if (this.state.images && this.state.images.length > 0) {
        var primary_image = [this.state.images[0]];

        if (this.state.image_captions && this.state.image_captions.length > 0) {
          var primary_imagetitle = [this.state.image_captions[0]];
          return (
            this.state.images.map((image, i) => {
            return (
              <ImageTile imageurl={image} imagetitle={this.state.image_captions[i]} id={i} deleteImage={this.deleteImage} onTitleChange={this.onTitleChange} makePrimary={this.makePrimary} storeImageSize={this.storeImageSize} caption={this.state.image_captions[i]} dimensions={this.state.image_dimensions[i]}/>
            );
          }));
        } else {
          return (true);
        }

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

  imageCountText() {
    if (this.state) {
      if (this.state.images) {
        if (this.state.images.length < 5) {
          return (
            <Message info>
              <Message.Header>You can upload up to {5 - this.state.images.length} more images.</Message.Header>
              <p>You set the primary image that will be displayed on the home page using the star button above each image</p>
            </Message>
          );
        } else {
          return (
            <Message info>
              <Message.Header>You have uploaded the maximum amount of images!</Message.Header>
              <p>You can delete images using the red button to make room for more.</p>
            </Message>
          );
        }
      } else {
        return (
          <Message info>
            <p>Upload up to 5 images to enhance your listing!</p>
          </Message>
        );
      }
    } else {
      return (
        <Message info>
          <p>Upload up to 5 images to enhance your listing!</p>
        </Message>
      );
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
              {this.titleMissing()}
              <Form.Group widths='equal'>
                <Form.Input label='Price' name='price' placeholder='$50' onChange={this.handlePriceChange.bind(this)} onSelect={this.onPriceSelect.bind(this)}/>
                <Form.Field control={Select} label='Price Type' name='price_type' options={price_units} placeholder='fixed' onChange={this.handlePriceTypeChange.bind(this)} onSelect={this.onPriceTypeSelect.bind(this)}/>
              </Form.Group>
              {this.priceError()}
              {this.priceMissing()}
              <Form.Field control={Select} label='Category' name='category' options={this.processCategories()} placeholder='select' onChange={this.handleCategoryChange.bind(this)} onSelect={this.onCategorySelect.bind(this)}/>
              <Form.TextArea name='description' label='Description' name='description' placeholder='Anything else we should know?' rows='3' onChange={this.handleDescriptionChange.bind(this)} onSelect={this.onDescriptionSelect.bind(this)}/>
              {this.descriptionError()}
              {this.descriptionMissing()}

              {(this.state && (!this.state.images || (this.state.images && this.state.images.length < 5))) && <ReactS3Uploader
                                                  signingUrl="/api/get_s3_url"
                                                  accept="image/*"
                                                  preprocess={this.onUploadStart.bind(this)}
                                                  onProgress={this.onProgress.bind(this)}
                                                  onError={this.onImageUploadError.bind(this)}
                                                  onFinish={this.onUploadFinish.bind(this)}/>}

              {this.uploadProgress()}
              {this.imageCountText()}
              <Button fluid compact color='teal' disabled={this.submitActive()} type='submit'>Submit</Button>
            </Form>

          </Grid.Column>
          <Grid.Column width={1}>

          </Grid.Column>
          <Grid.Column width={7}>

            {this.renderPrimaryImage()}

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
