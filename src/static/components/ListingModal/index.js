import React from 'react';
import { Header, Modal, Divider, Image, Button, Rail, Grid, Segment, Container } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageModal from '../MessageModal';
import ImageDisplay from './ImageDisplay';

const max_img_height = 300;

class ListingModal extends React.Component {
    constructor(props) {
        super(props);
        this.resizeImage = this.resizeImage.bind(this);
        this.state = {images : this.props.listing.images, image_captions : this.props.listing.image_captions, image_dimensions : this.props.listing.image_dimensions, main_img_height : 1, main_img_width : 1, correct_size : false};
    }

    componentDidMount() {
      if (this.state.image_dimensions) {
        this.resizeImage(this.state.image_dimensions[0][0],this.state.image_dimensions[0][1]);
      }
    }

    displaySecondaryImages() {
     if (this.props.listing) {
       if (this.props.listing.images && this.props.listing.images.length > 1) {
         if (this.props.listing.image_captions && this.props.listing.image_captions.length > 1) {
           return (
             this.props.listing.images.map((image, i) => {
             return (
               <ImageDisplay imageurl={image} caption={this.props.listing.image_captions[i]} index={i} />
             );
           }));
         } else {
           return (true);
         }
       } else {
         return (true);
       }
     } else {
       return (true);
     }
   }

   resizeImage(img_width, img_height) {

     var ratio = (img_height / max_img_height);
     if (img_height > max_img_height) {
       this.setState({main_img_width : img_width/ratio, main_img_height : '100%', correct_size : true});
     } else {
       this.setState({main_img_width : '100%', main_img_height : img_height*ratio, correct_size : true});
     }
   }

   displayMainImage() {
     if (this.state) {
       if (this.state.images && this.state.images.length > 0) {
         if (this.state.main_img_height && this.state.main_img_width) {
           return (
               <Image verticalAlign='middle' height={this.state.main_img_height} width={this.state.main_img_width} src={this.state.images[0]} />
           );
         } else {
           return (true);
         }
       } else {
         return (true);
       }
     } else {
       return (true);
     }
   }

   displayMainCaption() {
     if (this.state) {
       if (this.state.image_captions && this.state.image_captions.length > 0) {
         return (
           <Container fluid><p>{this.state.image_captions[0]}</p></Container>
         );
       } else {
         return (true);
       }
     } else {
       return (true);
     }
   }

   nextImage() {
     if (this.state) {
       if (this.state.images && this.state.image_captions && this.state.image_dimensions) {
         if (this.state.images.length > 1 && this.state.image_captions.length > 1 && this.state.image_dimensions.length > 1) {
           var images_copy = this.state.images.slice();
           var first_image = images_copy.shift();
           images_copy.push(first_image);

           var image_captions_copy = this.state.image_captions.slice();
           var first_caption = image_captions_copy.shift();
           image_captions_copy.push(first_caption);

           var dim_copy = this.state.image_dimensions.slice();
           var main_dim = dim_copy.shift();
           dim_copy.push(main_dim);

           this.resizeImage(main_dim[0],main_dim[1]);

           this.setState({images : images_copy, image_captions : image_captions_copy, image_dimensions : dim_copy, correct_size : false});
         }
       }
     }
   }
    render() {
        var style = {
            display: 'inline-block',
            marginRight: '10%',
        }
        var style2 = {
            width: '50%',
            margin: '0 auto',
        }
        var style3 = {
            width: '10%',
            float: 'left'
        }
        var style4 = {
            width: '10%',
            float: 'right'
        }
        var style6 = {
            height: '43%',
        }
        return (
            <Modal trigger={this.props.trigger}>
                <Modal.Header>
                    <Grid columns={2}>
                        <Grid.Column width={8}>
                          <Segment basic style={{padding : 0, border : 0, height : max_img_height}}>
                            <div style={{overflow : 'hidden'}}>
                              {this.displayMainImage()}
                            </div>

                            {this.displayMainCaption()}
                            <Rail internal style={{margin:'0px', padding:'0px'}} position='right'>
                              <div style={style6}></div>
                              <Button floated='right' icon='angle right' onClick={this.nextImage.bind(this)}></Button>
                            </Rail>

                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                          {this.displaySecondaryImages()}
                        </Grid.Column>
                      </Grid>
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Header as='h2'>{this.props.listing.title}</Header>
                    <div style={style}>
                        <Header sub>Price</Header>
                        <span>${this.props.listing.price}{this.props.listing.extraPriceInfo}</span>
                    </div>
                    <div style={style}>
                        <Header sub>Category</Header>
                        <span>{this.props.listing.category}</span>
                    </div>
                    <div style={style}>
                        <Header sub>Seller</Header>
                        <span>{this.props.listing.author ? this.props.listing.author : 'Anonymous'}</span>
                    </div>
                    <div style={style}>
                        <Header sub>Date Posted</Header>
                        <span>{this.props.listing.listing_date}</span>
                    </div>
                    <Divider/>
                    <p>{this.props.listing.description}</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.props.user_id && <MessageModal trigger={<Button color='teal' icon='mail outline' labelPosition='right' content='Contact Seller' />}/>}
                  </Modal.Actions>
              </Modal>
        );
    }
}

export default(ListingModal);
