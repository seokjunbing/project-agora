import React from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';

class MessageModal extends React.Component {
    updateMessage = (e) => {
        this.setState({
            text: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var users = [];
        users.push(this.props.user_id);
        users.push(this.props.listing.author_pk);
        this.setState({
            listing: this.props.listing.id,
            users: users,
            user: this.props.user_id,
        }, function() {
            this.props.actions.createConversation(this.state);
            window.location = '/messaging';
        });
    }

    render() {
        return (
            <Modal trigger={this.props.trigger} basic>
                <Modal.Header>
                    <h1>Contact Seller</h1>
                    <h4>Write your message below.</h4>
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                      <Form onSubmit={this.handleSubmit.bind(this)}>
                          <Form.Input name='message' placeholder='Write a message...' onChange={this.updateMessage.bind(this)} action={<Button color='teal' type='submit' id='messageSubmit' disabled={(this.state && this.state.text) ? false : true}>Send</Button>}/>
                      </Form>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);
