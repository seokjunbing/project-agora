import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE,
        FETCH_CONVERSATIONS_REQUEST, FETCH_CONVERSATIONS_SUCCESS, FETCH_CONVERSATIONS_FAILURE,
        SET_SELECTED_CONVERSATION, FETCH_LISTING_REQUEST, FETCH_LISTING_SUCCESS, FETCH_LISTING_FAILURE,
        SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE } from '../constants';

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

export function fetchListingSuccess(listing) {
    return {
        type: FETCH_LISTING_SUCCESS,
        payload: {
            listing: listing,
        }
    };
}

export function fetchListingFailure(error) {
    return {
        type: FETCH_LISTING_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
}

export function fetchListingRequest() {
    return {
        type: FETCH_LISTING_REQUEST
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

export function sendMessageSuccess() {
    return {
        type: SEND_MESSAGE_SUCCESS
    };
};

export function sendMessageFailure(error) {
    return {
        type: SEND_MESSAGE_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
};

export function sendMessageRequest(data) {
    return {
        type: SEND_MESSAGE_REQUEST
    };
};

export function fetchMessages(conversation) {
    return (dispatch) => {
        var url = '/api/messages/?conversation=' + conversation.toString();
        dispatch(fetchMessagesRequest());
        var token = localStorage.getItem("LOCAL_TOKEN");

        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authentication': 'JWT ' + token,
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
        var token = localStorage.getItem("LOCAL_TOKEN");
        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authentication': 'JWT ' + token,
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if(typeof response !== 'undefined' && response.length > 0){
                    for(let conversation of response) {
                        dispatch(fetchMessages(conversation.id));
                        dispatch(fetchListing(conversation.listing));
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

export function fetchListing(listing) {
    return (dispatch) => {
        var url = '/api/listings/' + listing.toString() + '/';
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
                dispatch(fetchListingSuccess(response));
            })
            .catch(error => {
                dispatch(fetchListingFailure(error));
            });
    };
}

export function sendMessage(data) {
    return (dispatch) => {
        dispatch(sendMessageRequest());
        var url = '/api/messages/';
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(sendMessageSuccess());
            })
            .catch(error => {
                dispatch(sendMessageFailure(error));
            });
    };
};
