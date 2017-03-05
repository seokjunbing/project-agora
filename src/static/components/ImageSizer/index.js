import React, { Component } from 'react';
import { Segment, Image, Reveal, Container } from 'semantic-ui-react';

class ImageSizer  extends Component {

   constructor(props) {
        super(props);
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    onImgLoad({target:img}) {
        this.props.storeImageSize(img.offsetHeight, img.offsetWidth, this.props.id);
    }

    render(){

      return (

          <Image fluid shape='rounded' onLoad={this.onImgLoad} src={this.props.image}/>

      );
    }
}

export default ImageSizer;
