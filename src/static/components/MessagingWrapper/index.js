import React from 'react';
import MessageTo from '../MessageTo';
import MessageFrom from '../MessageFrom';
import { Grid, Divider, Segment, Input, Button, Step, Icon, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';
import ConversationTab from '../ConversationTab';
import MessageList from '../MessageList';

class MessagingWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hashDone: false,
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.conversations && nextProps.conversations.length > 0 && window.location.hash && nextState.hashDone == false) {
            this.props.actions.setSelectedConversation(parseInt(window.location.hash.substring(1)));
            this.setState({
                hashDone: true,
            });
        }
        var submit = document.getElementById('messageSubmit');
        if(nextState && nextState.text != '') {
            submit.disabled = false;
        } else {
            submit.disabled = true;
        }
    }

    updateMessage = (e) => {
        this.setState({
            text: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var convo = this.props.conversations[this.props.selectedConversation];
        this.setState({
            text: this.state.text,
            conversation: convo.id,
            user: this.props.user,
        }, function() {
            this.props.actions.sendMessage(this.state);
            var readBy = [];
            readBy.push(this.props.user);
            convo.read_by = readBy;
            this.props.actions.updateConversation(convo);
            this.setState({
                text: '',
            });
        });
    }

    render() {
        var style1 = {
            width: '100%',
            height: '490px',
            overflowY: 'scroll',
            overflowX: 'hidden',
        }
        var style2 = {
            height: '500px',
        }
        var style3 = {
            height: '515px',
        }

        return (
            <div>
                <Grid verticalAlign='middle' columns={4} divided celled='internally' style={style2}>
                    <Grid.Column width={3}>
                    </Grid.Column>
                    <Grid.Column width={3} style={style3}>
                        <Step.Group vertical style={style1}>
                            { this.props.conversations && this.props.conversations.map((conversation, index) => {
                                return <ConversationTab key={conversation.id} index={index} listing_title={conversation.related_listing.title}
                                                listing_images={conversation.related_listing.images} messages={conversation.all_messages}
                                                read_by={conversation.read_by} recipient={this.props.user == conversation.related_listing.author_pk ? conversation.buyer_name : conversation.related_listing.author_name}/>
                            })}
                        </Step.Group>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        { this.props.conversations && <MessageList messages={this.props.conversations[this.props.selectedConversation].all_messages}/> }
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Form.Input name='message' placeholder='Write a message...' value={this.state ? this.state.text : ''} onChange={this.updateMessage.bind(this)} action={<Button color='teal' type='submit' id='messageSubmit'>Send</Button>}/>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedConversation: state.messaging.selectedConversation,
        user: state.user.user_id,
        conversations: state.messaging.conversations,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagingWrapper);
