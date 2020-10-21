import config from '../../../config/config'

export const loadingRoomOn = () => {
    return function (dispatch) {
        dispatch({ type: 'LOADING_ROOM_ON' })
    }
}

export const loadingRoomOff = () => {
    return function (dispatch) {
        dispatch({ type: 'LOADING_ROOM_OFF' })
    }
}


export function roomClosed(id, data) {
    // console.log('roomClosed: ', data);
    return function(dispatch) {
        dispatch({ type: 'ROOM_CLOSED', payload: { id, data } })
    }
}

export function joinRoom(id, session, ws) {

    // console.log("Post /enter-room:", { id, session })
    return function(dispatch) {
        
        try {
            dispatch({ type: 'LOADING_ROOM_ON' })
    
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
                dispatch({ type: 'LOADING_ROOM_OFF' });
            })
            .catch(error => {
                dispatch({ type: 'ROOM_NOT_JOINED', payload: { id, error: "No se pudo ingresar a una sala. Intenta nuevamente" } })
                dispatch({ type: 'LOADING_ROOM_OFF' })
            })
        } catch (error) {
            dispatch({ type: 'ROOM_NOT_JOINED', payload: { id, error } })
            dispatch({ type: 'LOADING_ROOM_OFF' })
        }
    }
}

export function leaveRoom(id, session) {

    return function(dispatch) {
        dispatch({ type: 'LOADING_ON' })
        try {
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
                dispatch({ type: 'LOADING_OFF' })
                dispatch({ type: 'ROOM_LEAVED', payload: { session, id, status: 'Leaved' } })
            })
            .catch(error => {
                dispatch({ type: 'LOADING_OFF' })
                dispatch({ type: 'ERROR', payload: { error: "Ocurrió un error, intente nuevamente" } })
            })
        } catch (error) {
            dispatch({ type: 'LOADING_OFF' })
            dispatch({ type: 'ERROR', payload: { error } })
        }
    }
}

export function status() {
    return function(dispatch) {
        try {
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
                // dispatch({
                //     type: 'ERROR',
                //     payload: { error: "Ocurrió un error, intente nuevamente" }
                // })
            })
        } catch (error) {
            // dispatch({
            //     type: 'ERROR',
            //     payload: { error }
            // })
        }
    }
}