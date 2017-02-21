import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import * as postActionCreators from '../../../../actions/postlisting';
import * as catActionCreators from '../../../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../../../CategoryDropdown';
import ReactS3Uploader from 'react-s3-uploader';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Container, Dropdown, Modal, Header, Icon } from 'semantic-ui-react';

const image_title_length = 100;

class ImageTile extends Component {


  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({title : this.props.imagetitle});
    this.setState({deleteModal : false, makePrimaryModal : false});
  }

  deleteModalOpen = (e) => this.setState({deleteModal : true});
  deleteModalClose = (e) => this.setState({deleteModal : false});

  makePrimaryModalOpen = (e) => this.setState({makePrimaryModal : true});
  makePrimaryModalClose = (e) => this.setState({makePrimaryModal : false});
  makePrimaryModalClose2 = (e) => {
    this.props.makePrimary(this.props.id);
    this.makePrimaryModalClose();
  }

  onImageTitleChange = (e) => {
      e.preventDefault();
      if (e.target.value.length < image_title_length) {
        this.setState({ title : e.target.value} );
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


  render() {
    return (
      <Segment basic>

        <Modal
          trigger={<Label color='red' icon='close' corner='right' onClick={this.deleteModalOpen}></Label>}
          size='small'
          open={this.state.deleteModal}
          onClose={this.deleteModalClose}
        >
          <Header content='Remove this image?' />
          <Modal.Actions>
            <Button color='grey' onClick={this.deleteModalClose}>
              <Icon name='chevron left' /> No
            </Button>
            <Button color='red' onClick={() => this.props.deleteImage(this.props.id)}>
              <Icon name='remove' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          trigger={<Label color={this.starColor()} icon='star' corner='left' onClick={this.makePrimaryModalOpen}></Label>}
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

        <Image shape='rounded' src={this.props.imageurl}/>
        <Input fluid placeholder='Image description' name='image_title' onChange={this.onImageTitleChange.bind(this)}/>
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
