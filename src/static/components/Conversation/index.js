import React from 'react';
import MessageTo from '../MessageTo';
import MessageFrom from '../MessageFrom';
import { Grid, Divider, Segment, Input, Button, Step, Icon } from 'semantic-ui-react';

class Conversation extends React.Component {
    render() {
        var style3 = {
            width: '100%',
        }
        return (
            <div>
            <Grid verticalAlign='middle' columns={4} divided celled='internally'>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Step.Group vertical>
                        <Step>
                            <Icon name='comments' />
                            <Step.Content>
                              <Step.Title>{this.props.listing}</Step.Title>
                              <Step.Description>{this.props.messages[this.props.messages.length-1].text}</Step.Description>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Grid.Column>
                <Grid.Column width={7}>
                    {
                        this.props.messages.map(message => {
                            if(message.user == 1) {
                                return <MessageFrom key={message.id} text={message.text}/>;
                            }
                            else {
                                return <MessageTo key={message.id} text={message.text}/>;
                            }

                        })
                    }
                    <Input action={<Button primary>Send</Button>} placeholder='Write a message...' style={style3}/>
                </Grid.Column>
                <Grid.Column width={3}>
                </Grid.Column>
            </Grid>
            </div>
        );
    }
}

export default (Conversation);
