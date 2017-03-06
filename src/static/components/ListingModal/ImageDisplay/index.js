import React, { Component } from 'react';
import { Segment, Image, Grid, Label, Progress } from 'semantic-ui-react';
import * as postActionCreators from '../../../actions/postlisting';
import * as catActionCreators from '../../../actions/categories';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryDropdown from '../../CategoryDropdown';
import ReactS3Uploader from 'react-s3-uploader';

import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea, Container, Dropdown, Modal, Header, Icon } from 'semantic-ui-react';

const image_title_length = 100;

class ImageDisplay extends Component {


  constructor(props) {
    super(props);
  }



  render() {
    return (
      <Segment basic style={{padding : 5, border : 0}}>
        <Image size='tiny' src={this.props.imageurl}/>
        <Container fluid ><span>{this.props.caption}</span></Container>
      </Segment>
    )
  }
}


export default (ImageDisplay);
