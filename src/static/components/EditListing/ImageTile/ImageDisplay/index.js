import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactS3Uploader from 'react-s3-uploader';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Container, Dropdown, Modal, Header, Icon } from 'semantic-ui-react';

const image_title_length = 100;
const max_img_height = 350;

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
    this.setState({comp_width : document.getElementById("target55").clientWidth});
    this.resizeImage(this.props.width, this.props.height);
  }

  componentWillReceiveProps(nextProps) {
    this.resizeImage(nextProps.width, nextProps.height);
  }

  resizeImage(img_width, img_height) {
      var maxWidth = document.getElementById("target55").clientWidth;
      var widthRatio = max_img_height/img_width;
      var heightRatio = maxWidth/img_height;
      var scaleFactor = Math.min(widthRatio, heightRatio);
      this.setState({height : img_width * scaleFactor, width : img_height * scaleFactor, correct_size : true});
  }

  displayImage() {
    if (this.state && this.state.comp_width && this.state.width) {
      if (this.state.comp_width - this.state.width < 2) {
        return (<Image shape='rounded' src={this.props.imageurl}  width={this.state.width} height={this.state.height}/>);
      } else {
        var width = Math.ceil(16*this.state.width/this.state.comp_width);
        if (width == 16) {
          return (<Image shape='rounded' src={this.props.imageurl}  width={this.state.width} height={this.state.height}/>);
        } else {
          return (
            <Grid centered>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column width={width}>
                <Image shape='rounded' src={this.props.imageurl}  width={this.state.width} height={this.state.height}/>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid>
          );
        }
      }
    }
  }

  render() {
    return (
      <Segment style={{backgroundColor : '#f2f2f2', padding : 0}}>
        {this.displayImage()}
      </Segment>
    )
  }
}


export default (ImageDisplay);
