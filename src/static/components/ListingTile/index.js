import React from 'react';
import { Card, Modal, Button, Header, Image, Divider, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';
import ListingModal from '../ListingModal';
import MessageModal from '../MessageModal';

class ListingTile extends React.Component {
    constructor(props) {
      super(props);
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

        return (
            <Card style={style1}>
                <Image style={style4} src={this.props.images ? this.props.images[0] : ''}/>
                <ListingModal trigger={<Button><h2>{this.props.title}</h2></Button>}
                            listing={this.props.listing} user_id={this.props.user_id}
                    />
                <Card.Content extra>
                    <Button.Group style={style3}>
                        <Button>${this.props.price}{this.props.extraPriceInfo}</Button>
                        {this.props.user_id && <MessageModal trigger={<Button color='teal' icon='mail outline' labelPosition='right' content='Contact' />}/>}
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
