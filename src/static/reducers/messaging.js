import { createReducer } from '../utils';
import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
    SET_SELECTED_CONVERSATION,
    FETCH_LISTING_REQUEST,
    FETCH_LISTING_SUCCESS,
    FETCH_LISTING_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
} from '../constants';

const initialState = {
    isFetching : false,
    isSending : false,
    conversations: null,
    statusText : '',
    messageData : '',
};

export default createReducer(initialState, {
    [FETCH_MESSAGES_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: 'Fetching messages...'
        });
    },
    [FETCH_MESSAGES_SUCCESS]: (state, payload) => {
        // take convos, make into hash table
        var conversations = {};
        for (var i = 0; i < state.conversations.length; i++) {
            var conversation = state.conversations[i];
            conversations[conversation.id] = conversation;
            conversations[conversation.id].messages = [];
        }
        // loop through messages and insert messages
        for (var i = 0; i < payload.messages.length; i++) {
            conversation = conversations[payload.messages[i].conversation];
            conversation.messages.push(payload.messages[i]);
        }
        var convos = [];
        // turn back into regular array
        for(var conversation in conversations) {
            convos.push(conversations[conversation]);
        }
        return Object.assign({}, state, {
            isFetching: false,
            conversations: convos,
            statusText: 'Successfully fetched messages.'
        });
    },
    [FETCH_MESSAGES_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            statusText: `Messages Fetch Error: ${payload.statusText}`
        });
    },
    [FETCH_CONVERSATIONS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: 'Fetching conversations...'
        });
    },
    [FETCH_CONVERSATIONS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            conversations: payload.conversations,
            statusText: 'Successfully fetched conversations.'
        });
    },
    [FETCH_CONVERSATIONS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            conversations: null,
            statusText: `Conversations Fetch Error: ${payload.statusText}`
        });
    },
    [SET_SELECTED_CONVERSATION]: (state, payload) => {
        return Object.assign({}, state, {
            selectedConversation: payload.conversation
        });
    },
    [FETCH_LISTING_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: 'Fetching listing...'
        });
    },
    [FETCH_LISTING_SUCCESS]: (state, payload) => {
        // find convo linked to listing
        for (var i = 0; i < state.conversations.length; i++) {
            if(state.conversations[i].listing == payload.listing.id) {
                state.conversations[i].listing_title = payload.listing.title;
                state.conversations[i].listing_images = payload.listing.images;
                break;
            }
        }
        var conversations = state.conversations;

        return Object.assign({}, state, {
            isFetching: false,
            conversations: conversations,
            statusText: 'Successfully fetched listing.'
        });
    },
    [FETCH_LISTING_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            statusText: `Listing Fetch Error: ${payload.statusText}`
        });
    },
    [SEND_MESSAGE_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isSending: true,
            statusText: 'Sending message...',
            messageData: payload,
        });
    },
    [SEND_MESSAGE_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isSending: false,
            postdata: payload.data,
            statusText: 'Successfully sent message.'
        });
    },
    [SEND_MESSAGE_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isSending: false,
            postdata: null,
            statusText: `Message Send Error: ${payload.statusText}`
        });
    },
});
