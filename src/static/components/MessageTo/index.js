import React from 'react';
import { Message } from 'semantic-ui-react';

class MessageTo extends React.Component {
    render() {
        var style = {
            maxWidth: '60%',
            float: 'left',
            textAlign: 'left',
        }
        return (
            <Message compact style={style}>
                {this.props.text}
            </Message>
        );
    }
}

export default (MessageTo);
