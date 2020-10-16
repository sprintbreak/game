import config from '../../../config/config'

export function roomClosed(id, data) {
    return function(dispatch) {
        dispatch({ type: 'ROOM_CLOSED', payload: { id, data } })
    }
}

export function joinRoom(id, session, ws) {

    console.log("Post /enter-room:", { id, session })
    return function(dispatch) {
        
        dispatch({ type: 'LOADING_ON' })

        ws.sendMessage(JSON.stringify({
            type: 'AUTHENTICATE',
            id: session.user_id,
            token: session.token,
            origin: session.origin
        }))
        
        return fetch(`${config.api.url}/enter-room`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-id': session.user_id,
                'x-session-type': session.origin,
                'x-token': session.token
            },
            body: JSON.stringify({ id:session.user_id })
        })
        .then(response => {
            if(!response.ok) {
                throw 'No se han encontrado jugadores, intente nuevamente';
            }
            return response.json()
        })
        .then(json => {
            dispatch({ type: 'ROOM_JOINED', payload: { response: json, id, status: 'Joined' } });
            dispatch({ type: 'LOADING_OFF' });
        })
        .catch(error => {
            dispatch({ type: 'ROOM_NOT_JOINED', payload: { id, error } })
            dispatch({ type: 'LOADING_OFF' })
        })
    }
}

export function leaveRoom(id, session) {
    return function(dispatch) {
        return fetch(`${config.api.url}/leave-room`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-id': session.user_id,
                'x-session-type': session.origin,
                'x-token': session.token
            }, body: JSON.stringify({ id: session.user_id })
        })
        .then(response => {
            if(!response.ok) {
                throw 'Ocurrió un error, intente nuevamente';
            }
            return response.json()
        })
        .then(json => {
            dispatch({ type: 'ROOM_LEAVED', payload: { response: json, id, status: 'Leaved' } })
        })
        .catch(error => {
            dispatch({ type: 'ERROR', payload: { error } })
        })
    }
}

export function status() {
    return function(dispatch) {
        return fetch(`${config.api.url}/status`, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok) {
                throw 'Ocurrió un error, intente nuevamente';
            }
            return response.json()
        })
        .then(status => {
            dispatch({
                type: 'STATUS',
                payload: {
                    rooms: status.rooms,
                    playingPlayers: status.playing_players,
                    waitingPlayers: status.waiting_players    
                }
            })
        })
        .catch(error => {
            dispatch({
                type: 'ERROR',
                payload: { error }
            })
        })
    }
}