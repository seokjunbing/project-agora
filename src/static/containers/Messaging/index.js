import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Conversation from '../../components/Conversation';

class MessagingView extends React.Component {
    componentDidMount() {
        this.props.actions.fetchConversations('/api/conversations/get_for_user/?user=' + this.props.user.toString());
        // var self = this;
        // setInterval(function() {
        //   self.props.actions.fetchConversations('/api/conversations/get_for_user/?user=' + self.props.user.toString());
        // }, 5000);
    }

    render() {
        return (
            <div>
                {this.props.conversations && this.props.conversations.map(conversation => {
                    return <Conversation key={conversation.id} convo_id={conversation.id} listing_id={conversation.listing}
                                         listing_title={conversation.listing_title} listing_images={conversation.listing_images}
                                         messages={conversation.messages} user={this.props.user}/>;
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching : state.messaging.isFetching,
        conversations : state.messaging.conversations,
        statusText : state.messaging.statusText,
        user : state.user.user_id,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagingView);
export { MessagingView as MessagingViewNotConnected };
