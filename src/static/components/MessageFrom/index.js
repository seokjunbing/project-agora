import React from 'react';
import { Message, Popup } from 'semantic-ui-react';

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
            <div>
                <Popup
                     trigger={<Message color='blue' style={style}>
                                 {this.props.text}
                             </Message>}
                     content={this.props.date}
                     positioning='left center'
                 />
            </div>
        );
    }
}

export default (MessageFrom);
