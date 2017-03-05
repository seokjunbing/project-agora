import React, { Component } from 'react';
import { Segment, Image, Reveal, Container } from 'semantic-ui-react';

class ImageSizer  extends Component {

   constructor(props) {
        super(props);
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    onImgLoad({target:img}) {
        this.props.storeImageSize(img.naturalHeight, img.naturalWidth, this.props.id);
        console.log(img.naturalHeight);
        console.log(img.naturalWidth);
    }

    render(){

      return (

          <Image fluid shape='rounded' onLoad={this.onImgLoad} src={this.props.image}/>

      );
    }
}

export default ImageSizer;
