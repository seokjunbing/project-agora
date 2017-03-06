import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactS3Uploader from 'react-s3-uploader';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Container, Dropdown, Modal, Header, Icon } from 'semantic-ui-react';

const image_title_length = 100;
const max_img_height = 300;
const max_img_width = 300;

class ImageDisplay extends Component {


  constructor(props) {
    super(props);
    this.state = {
      width : 1,
      height : 1,
      correct_size : false,
    }
  }

  componentWillMount() {
    this.resizeImage(this.props.width, this.props.height);
  }

  resizeImage(img_width, img_height) {
      var widthRatio = max_img_width/img_width;
      var heightRatio = max_img_height/img_height;
      var scaleFactor = Math.min(widthRatio, heightRatio);
      this.setState({width : img_width * scaleFactor, height : img_height * scaleFactor, correct_size : true});
  }

  render() {
    return (
      <Segment basic style={{padding : 0, border : 0}}>
        <Image size='tiny' fluid src={this.props.imageurl} width={this.state.width} height={this.state.height}/>
      </Segment>
    )
  }
}


export default (ImageDisplay);
