import React from 'react';
import { connect } from 'react-redux';
import { Grid, Message, Divider, Segment, Input, Button, Step, Icon } from 'semantic-ui-react';

class MessagesView extends React.Component {

    render() {
        var style = {
            maxWidth: '60%',
            float: 'right',
            textAlign: 'right',
        }
        var style2 = {
            maxWidth: '60%',
            float: 'left',
            textAlign: 'left',
        }
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
                                  <Step.Title>Conversation 1</Step.Title>
                                  <Step.Description>Lorem ipsum blahblahbbfff...</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step>
                                <Icon name='comments' />
                                <Step.Content>
                                  <Step.Title>Conversation 2</Step.Title>
                                  <Step.Description>Last message</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step active>
                                <Icon name='comments' />
                                <Step.Content>
                                  <Step.Title>Conversation 3</Step.Title>
                                  <Step.Description>Last message</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step>
                                <Icon name='comments' />
                                <Step.Content>
                                  <Step.Title>Conversation 4</Step.Title>
                                  <Step.Description>Last message</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step>
                                <Icon name='comments' />
                                <Step.Content>
                                  <Step.Title>Conversation 5</Step.Title>
                                  <Step.Description>Last message</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <Message compact style={style2}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                            make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                        </Message>
                        <Message compact style={style}  inverted color='blue' tertiary>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
                            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                            make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                        </Message>
                        <Input action={<Button primary>Send</Button>} placeholder='Write a message...' style={style3}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
const mapDispatchToProps = () => {
    return {};
};

export default connect(mapDispatchToProps)(MessagesView);
export { MessagesView as MessagesViewNotConnected };
