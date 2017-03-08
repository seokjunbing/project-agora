import React from 'react';
import { Header, Modal, Divider, Image, Button, Rail, Grid, Segment, Container } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageModal from '../MessageModal';
import ImageDisplay from './ImageDisplay';

const max_img_height = 300;
const max_img_width = 800;

class ListingModal extends React.Component {
    constructor(props) {
        super(props);
        this.resizeImage = this.resizeImage.bind(this);
        this.state = {images : this.props.listing.images,
                    image_captions : this.props.listing.image_captions,
                    image_dimensions : this.props.listing.image_dimensions,
                    main_img_height : 1,
                    main_img_width : 1,
                    curr_image: 0,
                    correct_size : false};
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
               <ImageDisplay imageurl={image} caption={this.props.listing.image_captions[i]} index={i} key={i}/>
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
       var widthRatio = max_img_width/img_width;
       var heightRatio = max_img_height/img_height;
       var scaleFactor = Math.min(widthRatio, heightRatio);
       this.setState({main_img_width : img_width * scaleFactor, main_img_height : img_height * scaleFactor, correct_size : true});
   }

   nextImage() {
     if (this.state) {
       if (this.state.images && this.state.image_captions && this.state.image_dimensions) {
           var next_image = null;
           if(this.state.curr_image == this.state.images.length - 1) {
               next_image = 0
           } else { next_image = this.state.curr_image + 1; }
           this.resizeImage(this.props.listing.image_dimensions[next_image][0],this.props.listing.image_dimensions[next_image][1]);
           this.setState({curr_image: next_image, correct_size : false});
       }
     }
   }
   formatDate(date) {
       var date = new Date(date);
       var dateFormat = require('dateformat');
       return dateFormat(date, "mmmm dS, yyyy");
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
        var style5 = {
            height: '43%',
        }
        var style6 = {
            marginLeft: '25%',
        }
        var style7 = {
            display: 'block',
            margin: 'auto',
        }
        var style8 = {
            textAlign: 'center',
            paddingTop: '10px',
            fontWeight: 'normal',
        }
        var style9 = {
            marginBottom: '10px',
        }

        return (
            <Modal trigger={this.props.trigger}>
                <Modal.Header>
                    <Grid columns={3} style={style9}>
                        <Grid.Column width={12}>
                          <Segment basic style={{padding : 0, border : 0, height : max_img_height}}>
                            <div style={{overflow : 'hidden'}}>
                              {this.state && <Image style={style7} height={this.state.main_img_height} width={this.state.main_img_width} src={this.state.images[this.state.curr_image]} />}
                            </div>

                            {(this.state && this.state.image_captions) && <Container fluid style={style8}><p>{this.state.image_captions[this.state.curr_image]}</p></Container>}

                          </Segment>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <div style={style5}></div>
                          {this.props.listing.images.length > 1 && <Button style={style6} icon='angle right' onClick={this.nextImage.bind(this)}></Button>}
                        </Grid.Column>

                        <Grid.Column width={2}>
                          <div>
                            {this.displaySecondaryImages()}
                          </div>
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
                        <span>{this.props.listing.category_name}</span>
                    </div>
                    <div style={style}>
                        <Header sub>Seller</Header>
                        <span>{this.props.listing.author_name ? this.props.listing.author_name : 'Anonymous'}</span>
                    </div>
                    <div style={style}>
                        <Header sub>Date Posted</Header>
                        <span>{this.formatDate(this.props.listing.listing_date)}</span>
                    </div>
                    <Divider/>
                    <p>{this.props.listing.description}</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {(this.props.user_id && this.props.listing && this.props.listing.author_pk && (this.props.user_id != this.props.listing.author_pk)) && <MessageModal trigger={<Button color='teal' icon='mail outline' labelPosition='right' content='Contact Seller'/>} listing={this.props.listing}/>}
                  </Modal.Actions>
              </Modal>
        );
    }
}

export default(ListingModal);
