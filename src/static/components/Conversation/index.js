import React from 'react';
import MessageTo from '../MessageTo';
import MessageFrom from '../MessageFrom';
import { Grid, Divider, Segment, Input, Button, Step, Icon, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';

class Conversation extends React.Component {
    componentWillUpdate(nextProps, nextState) {
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

    handleSubmit() {
        this.setState({
            text: this.state.text,
            conversation: this.props.convo_id,
            user: this.props.user,
        }, function() {
            this.props.actions.sendMessage(this.state);
        });
    }

    render() {
        var style = {
            borderRadius: '50%',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '50px',
            height: '50px',
            marginRight: '10px',
        }
        var style2 = {
            width: '100%',
        }
        var style3 = {
            width: '100%',
        }
        var style4 = {
            height: '500px',
        }

        return (
            <div style={style4}>
            <Grid verticalAlign='middle' columns={4} divided celled='internally'>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Step.Group vertical>
                        <Step style={style2}>
                            <img src={this.props.listing_images ? this.props.listing_images[0] : ''} style={style}/>
                            <Step.Content>
                              <Step.Title>{this.props.listing_title}</Step.Title>
                              <Step.Description>{this.props.messages ? this.props.messages[this.props.messages.length-1].text : ''}</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Grid.Column>
                <Grid.Column width={7}>
                    {
                        this.props.messages && this.props.messages.slice(0).reverse().map(message => {
                            if(message.user == this.props.user) {
                                return <MessageFrom key={message.id} text={message.text}/>;
                            }
                            else {
                                return <MessageTo key={message.id} text={message.text}/>;
                            }
                        })
                    }
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Input name='message' placeholder='Write a message...' onChange={this.updateMessage.bind(this)} style={style3} action={<Button color='teal' type='submit' id='messageSubmit'>Send</Button>}/>
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
