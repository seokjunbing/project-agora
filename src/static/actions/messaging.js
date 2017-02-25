import fetch from 'isomorphic-fetch';
import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_CONVERSATIONS_REQUEST, FETCH_CONVERSATIONS_SUCCESS, FETCH_CONVERSATIONS_FAILURE,
        SET_SELECTED_CONVERSATION, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE,
        CREATE_CONVERSATION_REQUEST, CREATE_CONVERSATION_SUCCESS, CREATE_CONVERSATION_FAILURE,
        UPDATE_CONVERSATION_REQUEST, UPDATE_CONVERSATION_SUCCESS, UPDATE_CONVERSATION_FAILURE, } from '../constants';

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

export function createConversationSuccess(conversation) {
    return {
        type: CREATE_CONVERSATION_SUCCESS,
        payload: {
            postdata: conversation,
        }
    };
};

export function createConversationFailure(error) {
    return {
        type: CREATE_CONVERSATION_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
};

export function createConversationRequest(data) {
    return {
        type: CREATE_CONVERSATION_REQUEST
    };
};

export function updateConversationSuccess(conversation) {
    return {
        type: UPDATE_CONVERSATION_SUCCESS,
        payload: {
            postdata: conversation,
        }
    };
};

export function updateConversationFailure(error) {
    return {
        type: UPDATE_CONVERSATION_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    };
};

export function updateConversationRequest(data) {
    return {
        type: UPDATE_CONVERSATION_REQUEST
    };
};

export function fetchConversations(url) {
    return (dispatch) => {
        dispatch(fetchConversationsRequest());
        var token = localStorage.getItem("LOCAL_TOKEN");
        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token,
            },
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                if(typeof response !== 'undefined' && response.length > 0){
                    dispatch(fetchConversationsSuccess(response));
                }
                else { dispatch(fetchConversationsSuccess(null)); }
            })
            .catch(error => {
                dispatch(fetchConversationsFailure(error));
            });
    };
}

export function sendMessage(data) {
    return (dispatch) => {
        dispatch(sendMessageRequest());
        var token = localStorage.getItem("LOCAL_TOKEN");
        var url = '/api/messages/';
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token,
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

export function createConversation(data) {
    return (dispatch) => {
        dispatch(createConversationRequest());
        var url = '/api/start_convo/';
        var token = localStorage.getItem("LOCAL_TOKEN");
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token,
            },

            body: JSON.stringify(data),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(createConversationSuccess(response));
            })
            .catch(error => {
                dispatch(createConversationFailure(error));
            });
    };
};

export function updateConversation(data) {
    return (dispatch) => {
        dispatch(updateConversationRequest());
        var url = '/api/conversations/' + data.id.toString() + '/';
        var token = localStorage.getItem("LOCAL_TOKEN");
        return fetch(url, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token,
            },

            body: JSON.stringify(data),
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(updateConversationSuccess(response));
            })
            .catch(error => {
                dispatch(updateConversationFailure(error));
            });
    };
};
