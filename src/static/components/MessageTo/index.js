import React from 'react';
import { Message } from 'semantic-ui-react';

class MessageTo extends React.Component {
    render() {
        var style = {
            maxWidth: '60%',
            float: 'left',
            clear: 'both',
            textAlign: 'left',
            margin: '0.2em 0',
        }
        return (
            <Message style={style}>
                {this.props.text}
            </Message>
        );
    }
}

export default (MessageTo);
