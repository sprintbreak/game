import config from './../../../config/config';

export function messageNew(id, data) {
    return function (dispatch) {
        dispatch({ type: 'NEW_MESSAGE', payload: {id, data}})
    }
}

export function sendMessage(id, session, message) {
    return function (dispatch) {
        return fetch(`${config.api.url}/send-message`, {
            method: 'post', mode: 'cors', headers: {
                'Content-Type': 'application/json',
                'x-id': session.user_id,
                'x-session-type': session.origin,
                'x-token': session.token
            }, body: JSON.stringify({ id: session.user_id, message })
        })
        .then(response => {
            if(!response.ok) {
                throw 'Ocurrió un error, intente nuevamente';
            }
            return response.json()
        })
        .then(json => {
            dispatch({ type: 'SEND_MESSAGE', payload: {id, response: json, message, username: session.username}})
        })
        .catch(error => {
            dispatch({ type: 'ERROR', payload: { error }})
        })
    }
}