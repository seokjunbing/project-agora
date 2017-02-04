import { createReducer } from '../utils';
import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
    SET_SELECTED_CONVERSATION
} from '../constants';

const initialState = {
    isFetching : false,
    conversations: null,
    statusText : ''
};

export default createReducer(initialState, {
    [FETCH_MESSAGES_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            statusText: null
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
            statusText: null
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
    }
});
