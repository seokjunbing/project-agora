import React from 'react';
import { Card, Modal, Button, Header, Image, Divider, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';

class ListingTile extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillUpdate(nextProps, nextState) {
        var submit = document.getElementById('messageSubmit');
        if(submit) {
            if(nextState && nextState.text != '') {
                submit.disabled = false;
            } else {
                submit.disabled = true;
            }
        }
    }

    updateMessage = (e) => {
        this.setState({
            text: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var users = [];
        users.push(this.props.user_id);
        users.push(this.props.author_id);
        this.setState({
            listing: this.props.listingId,
            users: users,
            user: this.props.user_id,
        }, function() {
            this.props.actions.createConversation(this.state);
            window.location = '/messaging';
        });
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
            display: 'inline-block',
            marginRight: '10%',
        }

        return (
            <Card style={style1}>
                <Image style={style4} src={this.props.images ? this.props.images[0] : ''}/>
                <Modal trigger={<Button><h2>{this.props.title}</h2></Button>}>
                    <Modal.Header>
                        <Image wrapped size='medium' src={this.props.images ? this.props.images[0] : ''}/>
                    </Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Header as='h2'>{this.props.title}</Header>
                        <div style={style5}>
                            <Header sub>Price</Header>
                            <span>${this.props.price}{this.props.extraPriceInfo}</span>
                        </div>
                        <div style={style5}>
                            <Header sub>Category</Header>
                            <span>{this.props.category}</span>
                        </div>
                        <div style={style5}>
                            <Header sub>Seller</Header>
                            <span>{this.props.author}</span>
                        </div>
                        <div style={style5}>
                            <Header sub>Date Posted</Header>
                            <span>{this.props.date}</span>
                        </div>
                        <Divider/>
                        <p>{this.props.description}</p>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        {this.props.user_id &&
                            <Modal trigger={<Button color='teal' icon='mail outline' labelPosition='right' content='Contact Seller' />} basic>
                            <Modal.Header>
                                <h1>Contact Seller</h1>
                                <h4>Write your first message below.</h4>
                            </Modal.Header>
                            <Modal.Content>
                              <Modal.Description>
                                  <Form onSubmit={this.handleSubmit.bind(this)}>
                                      <Form.Input name='message' placeholder='Write a message...' onChange={this.updateMessage.bind(this)} action={<Button color='teal' type='submit' id='messageSubmit'>Send</Button>}/>
                                  </Form>
                              </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                              </Modal.Actions>
                          </Modal>}
                      </Modal.Actions>
                  </Modal>
                <Card.Content extra>
                    <Button.Group style={style3}>
                        <Button>${this.props.price}{this.props.extraPriceInfo}</Button>
                        {this.props.user_id &&
                            <Modal trigger={<Button color='teal' icon='mail outline' labelPosition='right' content='Contact' />} basic>
                            <Modal.Header>
                                <h1>Contact Seller</h1>
                                <h4>Write your first message below.</h4>
                            </Modal.Header>
                            <Modal.Content>
                              <Modal.Description>
                                  <Form onSubmit={this.handleSubmit.bind(this)}>
                                      <Form.Input name='message' placeholder='Write a message...' onChange={this.updateMessage.bind(this)} action={<Button color='teal' type='submit' id='messageSubmit'>Send</Button>}/>
                                  </Form>
                              </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                              </Modal.Actions>
                          </Modal>}

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
