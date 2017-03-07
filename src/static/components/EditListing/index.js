import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import * as putActionCreators from '../../actions/putlisting';
import * as catActionCreators from '../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../CategoryDropdown';
import ImageTile from './ImageTile';
import ReactS3Uploader from 'react-s3-uploader';
import { browserHistory } from 'react-router';

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
const max_price = 9999.99;

class EditListing extends Component {

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
        this.setState({image_dimensions : dim_copy}, function() {console.log(this.state) });
      } else {
        console.log("WRONG IMAGE STUFF");
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
    console.log(this.state.image_captions);
  }

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
      if (isNaN(e.target.value) == false && (e.target.value < max_price) && ((e.target.value*100 % 1) == 0)) {
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
        var new_state = {
          price : this.state.price,
          price_type : this.state.price_type,
          sale_type : this.state.sale_type,
          description : this.state.description,
          title : this.state.title,
          images : this.state.images,
          image_dimensions : this.state.image_dimensions,
          image_captions : this.state.image_captions,
          new : this.state.new,
          category : this.state.category,
        };
        console.log(new_state);
        console.log('submitted');
        this.props.putActions.putListing(new_state, this.state.id);
        browserHistory.push('/profile');
    });
  }

  cancelEdit() {
    this.props.putActions.putListing(null);
    browserHistory.push('/profile');
  }

  componentDidMount() {
    this.props.catActions.fetchCategories();
    var num_images = this.props.current_listing.images.length;
    this.setState({
      category : this.props.current_listing.category,
      categoryChanged : 1,
      categoryValid : 1,
      description : this.props.current_listing.description,
      descriptionChanged : 1,
      descriptionTouched : 1,
      descriptionValid : 1,
      imagePresent : 1,
      imageUploadStatus : 2,
      imageUploadPercent : 0,
      image_captions : this.props.current_listing.image_captions,
      image_dimensions : this.props.current_listing.image_dimensions,
      images : this.props.current_listing.images,
      price : this.props.current_listing.price,
      priceChanged : 1,
      priceTouched : 1,
      priceValid : 1,
      price_type : this.props.current_listing.price_type,
      pricetypeChanged : 1,
      pricetypeValid : 1,
      title : this.props.current_listing.title,
      titleChanged : 1,
      titleValid : 1,
      closed : this.props.current_listing.closed,
      closing_date : this.props.current_listing.closing_date,
      flags : this.props.current_listing.flags,
      id : this.props.current_listing.id,
      listing_date : this.props.current_listing.listing_date,
      number_of_inquiries : this.props.current_listing.number_of_inquiries,
      new : this.props.current_listing.new,
      sale_type : this.props.current_listing.sale_type,
      views : this.props.current_listing.views,
    });
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
      if (this.state.titleValid && this.state.priceValid && this.state.pricetypeValid && this.state.categoryValid && this.state.descriptionValid && this.state.imagePresent && this.state.image_dimensions) {
        return (false);
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
              <ImageTile imageurl={image} imagetitle={this.state.image_captions[i]} id={i} deleteImage={this.deleteImage} onTitleChange={this.onTitleChange} makePrimary={this.makePrimary} storeImageSize={this.storeImageSize} caption={this.state.image_captions[i]}/>
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
    console.log(file);
    console.log('this was the file');

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
      <Segment basic padded='very'>
        <Grid>
          <Grid.Column width={8}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Input value={this.state.title} label='Title' name='title' placeholder='e.g. 42 inch LG TV' onChange={this.handleTitleChange.bind(this)} onSelect={this.onTitleSelect.bind(this)}/>
              {this.titleError()}
              <Form.Group widths='equal'>
                <Form.Input value={this.state.price} label='Price' name='price' placeholder='$50' onChange={this.handlePriceChange.bind(this)} onSelect={this.onPriceSelect.bind(this)}/>
                <Form.Field value={this.state.price_type} control={Select} label='Price Type' name='price_type' options={price_units} placeholder='fixed' onChange={this.handlePriceTypeChange.bind(this)} onSelect={this.onPriceTypeSelect.bind(this)}/>
              </Form.Group>
              {this.priceError()}
              <Form.Field value={this.state.category} control={Select} label='Category' name='category' options={this.processCategories()} placeholder='select' onChange={this.handleCategoryChange.bind(this)} onSelect={this.onCategorySelect.bind(this)}/>
              <Form.TextArea value={this.state.description} name='description' label='Description' name='description' placeholder='Anything else we should know?' rows='3' onChange={this.handleDescriptionChange.bind(this)} onSelect={this.onDescriptionSelect.bind(this)}/>
              {this.descriptionError()}

              {(this.state && (!this.state.images || (this.state.images && this.state.images.length < 5))) && <ReactS3Uploader
                  signingUrl="/api/get_s3_url"
                  accept="image/*"
                  preprocess={this.onUploadStart.bind(this)}
                  onProgress={this.onProgress.bind(this)}
                  onError={this.onImageUploadError.bind(this)}
                  onFinish={this.onUploadFinish.bind(this)}/>}

              {this.uploadProgress()}
              {this.imageCountText()}
              <Grid columns={2}>
                <Grid.Column>
                  <Button fluid compact color='grey' onClick={() => this.cancelEdit()}>Cancel</Button>
                  </Grid.Column>
                <Grid.Column>
                  <Button fluid compact color='blue' disabled={this.submitActive()} type='submit'>Save</Button>
                </Grid.Column>
              </Grid>

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
        isPutting : state.putListing.isPuting,
        categories : state.categories.categories,
        statusText : state.putListing.statusText,
        user : state.user.user_id,
        current_listing : state.editListing.current_listing,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        putActions: bindActionCreators(putActionCreators, dispatch),
        catActions: bindActionCreators(catActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditListing);
