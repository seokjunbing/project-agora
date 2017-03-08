import React from 'react';
import { Card, Modal, Button, Header, Image, Divider, Form, Icon, Popup } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/putlisting';
import ListingModal from '../ListingModal';
import MessageModal from '../MessageModal';

var url = require('url');

class ListingTile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          flagged : false,
      }
    }

    flagListing(e) {
        e.preventDefault();
        if(this.state && !this.state.flagged) {
            var listing = this.props.listing;
            listing.flags++;
            this.props.actions.putListing(listing, this.props.listingId);
            this.setState({ flagged: true });
        } else {
            var listing = this.props.listing;
            listing.flags--;
            this.props.actions.putListing(listing, this.props.listingId);
            this.setState({ flagged: false });
        }
    }

    listingTitle() {
      if (this.props && this.props.title) {
        if (this.props.title.length > 20) {
          return (
            this.props.title.substring(0,20) + "..."
          );
        } else {
          return (
            this.props.title
          );
        }
      }
    }

    render() {

        var style1 = {
            marginLeft: '15px',
        }
        var style2 = {
            textAlign: 'center',
        }
        var style3 = {
            display: 'block',
            margin: 'auto',
            textAlign: 'center',
        }
        var style4 = {
            minHeight: '200px',
            maxHeight: '200px',
        }

        var style5 = {
            minHeight: '300px',
            maxHeight: '300px',
            backgroundImage: "url(" + this.props.listing.images[0] +")",
            backgroundSize: 'cover',
        }

        var style6 = {
            textAlign: 'center',
            backgroundColor: '#f7f7f7',
            color: 'black',
            minHeight: '50px',
            verticalAleign: 'middle',
            lineHeight: '2',
        }

        console.log(this.props);

        return (

            <Card style={style1}>

                <ListingModal trigger={<div style={style5}><Header as='h2' style={style6}>{this.listingTitle()}</Header></div>}
                            listing={this.props.listing} user_id={this.props.user_id}
                    />
                <Card.Content extra>
                    <Button.Group style={style3}>
                        <Button>${this.props.price}{this.props.extraPriceInfo}</Button>
                        {(this.props.user_id && (this.props.user_id != this.props.author_id)) && <MessageModal trigger={<Button color='teal' content='Contact' />} listing={this.props.listing}/>}
                        <Popup
                          trigger={<Button onClick={this.flagListing.bind(this)} icon><Icon color={(this.state && this.state.flagged) ? 'red' : 'grey'} name='flag'/></Button>}
                          content='Flag as inappropriate'
                        />
                    </Button.Group>
                </Card.Content>
              </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_id : state.user.user_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingTile);
