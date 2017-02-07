import React from 'react';
import { Step, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/messaging';

class ConversationTab extends React.Component {
    setConvo() {
        this.props.actions.setSelectedConversation(this.props.index);
    }

    render() {
        var style = {
            borderRadius: '50%',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '50px',
            height: '50px',
            marginRight: '10px',
        }
        var style2 = {
            width: '100%',
        }
        return (
            <Step style={style2} active={this.props.selected == this.props.index ? true : false} onClick={this.setConvo.bind(this)}>
                <img src={(this.props.listing_images && this.props.listing_images.length > 0) ? this.props.listing_images[0] : ''} style={style}/>
                <Step.Content>
                  <Step.Title>{this.props.listing_title}</Step.Title>
                  <Step.Description>{(this.props.messages && this.props.messages.length > 0) ? this.props.messages[this.props.messages.length-1].text : ''}</Step.Description>
                </Step.Content>
            </Step>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selected: state.messaging.selectedConversation,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationTab);
