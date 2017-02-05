import React from 'react';
import { Message } from 'semantic-ui-react';

class MessageFrom extends React.Component {
    render() {
        var style = {
            maxWidth: '60%',
            float: 'right',
            clear: 'both',
            textAlign: 'right',
            margin: '0.2em 0',
        }
        return (
            <Message color='blue' style={style}>
                {this.props.text}
            </Message>
        );
    }
}

export default (MessageFrom);
