import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import MessagingWrapper from '../../components/MessagingWrapper';
import ErrorPanel from '../../components/ErrorPanel';


class MessagingView extends React.Component {
    componentDidMount() {
        this.props.actions.fetchConversations('/api/conversations/get_for_user/?user=' + this.props.user.toString());
        var self = this;
        setInterval(function() {
            if(!self.props.isFetching) {
                self.props.actions.fetchConversations('/api/conversations/get_for_user/?user=' + self.props.user.toString());
            }
        }, 1000);
    }

    render() {
        return (
            <div>
                {this.props.conversations && <MessagingWrapper/>}
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
