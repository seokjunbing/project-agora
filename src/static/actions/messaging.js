import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE,
        FETCH_CONVERSATIONS_REQUEST, FETCH_CONVERSATIONS_SUCCESS, FETCH_CONVERSATIONS_FAILURE,
        SET_SELECTED_CONVERSATION } from '../constants';

export function fetchMessagesSuccess(messages) {
    return {
        type: FETCH_MESSAGES_SUCCESS,
        payload: {
            messages: messages,
        }
    };
}

export function fetchMessagesFailure(error) {
    return {
        type: FETCH_MESSAGES_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function fetchMessagesRequest() {
    return {
        type: FETCH_MESSAGES_REQUEST
    };
}

export function fetchConversationsSuccess(conversations) {
    return {
        type: FETCH_CONVERSATIONS_SUCCESS,
        payload: {
            conversations: conversations,
        }
    };
}

export function fetchConversationsFailure(error) {
    return {
        type: FETCH_CONVERSATIONS_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function fetchConversationsRequest() {
    return {
        type: FETCH_CONVERSATIONS_REQUEST
    };
}

export function setSelectedConversation(conversation) {
    return {
        type: SET_SELECTED_CONVERSATION,
        payload: {
            conversation: conversation,
        }
    };
}

export function fetchMessages(conversation) {
    return (dispatch) => {
        var url = '/api/messages/?conversation=' + conversation.toString();
        dispatch(fetchMessagesRequest());

        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if(typeof response.results !== 'undefined' && response.results.length > 0){
                    dispatch(fetchMessagesSuccess(response.results));
                }
                else { dispatch(fetchMessagesSuccess(null)); }
            })
            .catch(error => {
                dispatch(fetchMessagesFailure(error));
            });
    };
}

export function fetchConversations(url) {
    return (dispatch) => {
        dispatch(fetchConversationsRequest());
        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if(typeof response !== 'undefined' && response.length > 0){
                    for(let conversation of response) {
                        dispatch(fetchMessages(conversation.id));
                    }
                    dispatch(fetchConversationsSuccess(response));
                }
                else { dispatch(fetchConversationsSuccess(null)); }
            })
            .catch(error => {
                dispatch(fetchConversationsFailure(error));
            });
    };
}
