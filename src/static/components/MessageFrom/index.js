import React from 'react';
import { Message } from 'semantic-ui-react';

class MessageFrom extends React.Component {
    render() {
        var style = {
            maxWidth: '60%',
            float: 'right',
            textAlign: 'right',
        }
        return (
            <Message compact style={style} inverted color='blue' tertiary>
                {this.props.text}
            </Message>
        );
    }
}

export default (MessageFrom);
