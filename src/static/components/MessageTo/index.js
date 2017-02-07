import React from 'react';
import { Message, Popup } from 'semantic-ui-react';

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
            <Popup
                 trigger={<Message style={style}>
                             {this.props.text}
                         </Message>}
                 content={this.props.date}
                 positioning='right center'
             />
        );
    }
}

export default (MessageTo);
