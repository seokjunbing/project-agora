import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import * as postActionCreators from '../../../../actions/postlisting';
import * as catActionCreators from '../../../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../../../CategoryDropdown';
import ReactS3Uploader from 'react-s3-uploader';
import ImageSizer from '../../../ImageSizer';
import ImageDisplay from './ImageDisplay';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Container, Dropdown, Modal, Header, Icon } from 'semantic-ui-react';

const image_title_length = 100;

class ImageTile extends Component {


  constructor(props) {
    super(props);
    this.storeImageSize = this.storeImageSize.bind(this);
  }

  componentWillMount() {
    this.setState({title : this.props.imagetitle});
    this.setState({deleteModal : false, makePrimaryModal : false, correct_size : false });
  }

  deleteModalOpen = (e) => this.setState({deleteModal : true});
  deleteModalClose = (e) => this.setState({deleteModal : false});

  deleteModalClose2 = (e) => {
    this.props.deleteImage(this.props.id);
    this.deleteModalClose();
  }

  makePrimaryModalOpen = (e) => this.setState({makePrimaryModal : true});
  makePrimaryModalClose = (e) => this.setState({makePrimaryModal : false});

  makePrimaryModalClose2 = (e) => {
    this.props.makePrimary(this.props.id);
    console.log('closing');
    this.makePrimaryModalClose();
  }

  onImageTitleChange = (e) => {
      e.preventDefault();
      if (e.target.value.length < image_title_length) {
        this.props.onTitleChange(this.props.id, e.target.value);
      }
  }

  isFirst() {
    if (this.props.id == 0) {
      return (false);
    } else {
      return (true);
    }
  }

  starColor() {
    if (this.props.id == 0) {
      return ('yellow');
    } else {
      return ('blue');
    }
  }

  storeImageSize(img_width, img_height) {
    this.props.storeImageSize(img_width, img_height, this.props.id);
    this.setState({correct_size : true});
  }

  displayImage() {
    if (this.state) {
      if (this.state.correct_size == false) {
        console.log('preview');
        return (<ImageSizer image={this.props.imageurl} storeImageSize={this.storeImageSize} id={this.props.id}/>);
      } else {
        console.log('real');
        return (
          <Image src={this.props.imageurl} fluid />
        );
      }
    }
  }

  makePrimaryIconDisplay() {
    if (this.props.id == 0) {
      return (true);
    } else {

      return (
        <div>
          <Modal
            trigger={<Label color={this.starColor()} style={{top : 0, left : 0}} icon='star' corner='left' onClick={this.makePrimaryModalOpen}></Label>}
            size='small'
            open={this.state.makePrimaryModal}
            onClose={this.makePrimaryModalClose}
          >
            <Header content='Make this the primary image?' />
            <Modal.Actions>
              <Button color='grey' onClick={this.makePrimaryModalClose}>
                <Icon name='chevron left' /> No
              </Button>
              <Button color='blue' onClick={this.makePrimaryModalClose2}>
                <Icon name='star' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      );
    }
  }


  render() {
    return (
      <Segment basic style={{padding : 0, border : 0}}>

        <Modal
          trigger={<Label style={{top : 0, right : 0}} color='red' icon='close' corner='right' onClick={this.deleteModalOpen}></Label>}
          size='small'
          open={this.state.deleteModal}
          onClose={this.deleteModalClose}
        >
          <Header content='Remove this image?' />
          <Modal.Actions>
            <Button color='grey' onClick={this.deleteModalClose}>
              <Icon name='chevron left' /> No
            </Button>
            <Button color='red' onClick={this.deleteModalClose2}>
              <Icon name='remove' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>

        {this.makePrimaryIconDisplay()}

        {this.displayImage()}

        <Input fluid value={this.props.caption} placeholder='Image description' name='image_title' onChange={this.onImageTitleChange.bind(this)}/>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        isPosting : true,
        categories : true,
        statusText : true,
        user : true,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        postActions: bindActionCreators(postActionCreators, dispatch),
        catActions: bindActionCreators(catActionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageTile);
