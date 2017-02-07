import React from 'react';
import MessageTo from '../MessageTo';
import MessageFrom from '../MessageFrom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';

class MessageList extends React.Component {

    render() {
        var style = {
            overflowY: 'scroll',
            height: '450px',
        }
        return (
            <div style={style}>
                {
                    this.props.messages.map(message => {
                        if(message) {
                            var dateFormat = require('dateformat');
                            var date = new Date(message.date);
                            date = dateFormat(date, "mm/dd/yy, h:MM TT");
                            if(message.user == this.props.user) {
                                return <MessageFrom key={message.id} text={message.text} date={date}/>
                            }
                            else {
                                return <MessageTo key={message.id} text={message.text} date={date}/>;
                            }
                        }
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
