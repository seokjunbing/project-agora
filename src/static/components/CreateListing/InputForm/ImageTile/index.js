import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import * as postActionCreators from '../../../../actions/postlisting';
import * as catActionCreators from '../../../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../../../CategoryDropdown';
import ReactS3Uploader from 'react-s3-uploader';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Container } from 'semantic-ui-react';

const image_title_length = 100;

class ImageTile extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({title : this.props.imagetitle});
  }

  onImageTitleChange = (e) => {
      e.preventDefault();
      console.log('title change local');
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

  render() {
    return (
      <Segment>

        <Label color='red' icon='close' attached='top right' onClick={() => this.props.deleteImage(this.props.id)}></Label>
        <Label color='blue' icon='star' attached='top left' active={this.isFirst.bind(this)} onClick={() => this.props.makePrimary(this.props.id)}></Label>
        <Image size='medium' src={this.props.imageurl}/>
        <Input placeholder='Image description' name='image_title' onChange={this.onImageTitleChange.bind(this)}/>

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
