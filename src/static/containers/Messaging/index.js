import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import Conversation from '../../components/Conversation';

class MessagingView extends React.Component {
    componentDidMount() {
        this.props.actions.fetchConversations('/api/conversations/get_for_user/?user=1');
    }

    render() {
        return (
            <div>
                {this.props.conversations && this.props.conversations.map(conversation => {
                    return <Conversation key={conversation.id} listing={conversation.listing} messages={conversation.messages}/>;
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching : state.messaging.isFetching,
        conversations: state.messaging.conversations,
        statusText : state.messaging.statusText,
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
