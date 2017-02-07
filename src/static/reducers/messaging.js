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
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAILURE,
} from '../constants';

const initialState = {
    isFetching : true,
    isSending : false,
    isCreating : false,
    conversations: null,
    createdConvo: null,
    selectedConversation: 0,
    statusText : '',
    messageData : '',
};

export default createReducer(initialState, {
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
    [CREATE_CONVERSATION_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isCreating: true,
            statusText: 'Creating conversation...',
            messageData: payload,
        });
    },
    [CREATE_CONVERSATION_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isCreating: false,
            createdConvo: payload,
            statusText: 'Successfully created conversation.'
        });
    },
    [CREATE_CONVERSATION_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isCreating: false,
            postdata: null,
            statusText: `Conversation Creation Error: ${payload.statusText}`
        });
    },
});
