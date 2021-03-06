import config from '../../../config/config';
import crypto from 'crypto'
import Cookies from 'js-cookie';

export function authenticateWs(ws, session) {
    return function() {
        ws.sendMessage(JSON.stringify({
            type: 'AUTHENTICATE',
            id: session.user_id,
            token: session.token,
            origin: session.origin,
        }))
    }
}

export function setWebsocket(ws) {
    return function (dispatch) {
        dispatch({ type: 'SET_WEBSOCKET', payload: { ws } })
    }
}

export function register(id, { data }) {
    const postData = {
        username: data.username,
        email: data.email,
    }

    const sha256_password = crypto.createHash('sha256').update(data.password).digest('base64');
    postData['sha256_password'] = sha256_password;

    return function(dispatch) {
        return fetch(`${config.api.url}/register`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if(!response.ok) {
                throw 'Ocurrió un error, intente nuevamente';
            }
            return response.json()
        })
        .then(json => {
            dispatch({ type: 'REGISTER_SUCCESS', payload: { id }})
        })
        .catch(error => {
            dispatch({ type: 'ERROR', payload: { id, error: "Ocurrió un error, intente nuevamente" }})
        })
    }
}

export function login(id, { origin, data }) {
    if(origin === 'santander') {
        return function(dispatch) {
            dispatch({ type: 'LOADING_ON' });
            try {                    
                return new Promise((resolve, reject) => {
                    fetch(`${config.api.url}/challenge?username=${data.username}`, {
                        method: 'get',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Session-Type': origin
                        }
                    })
                    .then(response => {
                        if(!response.ok) {
                            throw 'Ocurrió un error, intente nuevamente';
                        }
                        return response.json()
                    })
                    .then(challenge => {
                        
                        const sha256_password = crypto.createHash('sha256').update(data.password).digest('base64')
                        const hmac = crypto.createHmac('sha256', sha256_password)
                        
                        hmac.update(challenge.challenge)
                        
                        const challengeLogin = {
                            "challenge_response": hmac.digest('base64'),
                            "username": data.username
                        }
                        
                        fetch(`${config.api.url}/login`, {
                            method: 'post', 
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Session-Type': origin
                            },
                            body: JSON.stringify(challengeLogin)
                        })
                        .then(response => {
                            if(!response.ok) {
                                throw 'Ocurrió un error, intente nuevamente';
                            }
                            return response.json()
                        })
                        .then(json => {
                            // console.log("Received:", json)

                            dispatch({
                                type: 'LOGIN_SUCCESS',
                                payload: {
                                    id: json.id,
                                    response: json,
                                    status: "Logged",
                                    logged: true,
                                    session: {
                                        origin
                                    }
                                }
                            })

                            // localStorage.setItem('logged', true);
                            // Cookies.remove('session');
                            // Cookies.set('session', {
                            //     id: json.id,
                            //     token: json.token,
                            //     expires: json.expires,
                            //     logged: true,
                            //     nickname: json.username,
                            //     origin,
                            //     status: "Logged"
                            // });

                            dispatch({ type: 'LOADING_OFF' });

                        })
                        .catch(error => {
                            dispatch({ type: 'LOGIN_ERROR', payload: { id, error: "Ocurrió un error, intente nuevamente" }})
                            dispatch({ type: 'LOADING_OFF' });
                        })
                    })
                    .catch(error => {
                        dispatch({ type: 'LOGIN_ERROR', payload: { id, error: "Ocurrió un error, intente nuevamente" }})
                        dispatch({ type: 'LOADING_OFF' });
                    })
                })
            } catch (error) {
                dispatch({ type: 'LOGIN_ERROR', payload: { id, error: "Ocurrió un error, intente nuevamente" }})
                dispatch({ type: 'LOADING_OFF' });
            }
            
        }
    }

}

export function loginGoogle({ origin, data }) {
    return function(dispatch) {
        // console.log("Post /login:", { data })
        dispatch({ type: 'LOADING_ON' });
        try {
            return fetch(`${config.api.url}/login`, {
                method: 'post', mode: 'cors', headers: {
                    'Content-Type': 'application/json',
                    'X-Session-Type': origin

                }, body: JSON.stringify(data)
            })
                .then(response => response)
                .then(response => {
                    if(!response.ok) {
                        throw 'Ocurrió un error con Google, intente nuevamente o ingrese otro usuario';
                    }
                    return response.json()
                })
                .then(json => {
                    // console.log("Received:", json);
        
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            id: json.id,
                            response: json,
                            status: "Logged",
                            logged: true,
                            session: {
                                origin
                            }
                        }
                    });
                    dispatch({ type: 'LOADING_OFF' })
                }).catch((error) => {
                    console.error('Error then catch', error);
                    dispatch({ type: 'LOGIN_ERROR', payload: { error }})
                    dispatch({ type: 'LOADING_OFF' });
                })            
        } catch (error) {
            console.error('Error trycatch: ', error);
            dispatch({ type: 'LOGIN_ERROR', payload: { error }})
            dispatch({ type: 'LOADING_OFF' });
        }
    };
}

export function logout(id, session) {
    // console.log("Post /logout:", { id })
    return function(dispatch) {
        dispatch({ type: 'LOADING_ON' });
        try {            
            return fetch(`${config.api.url}/logout`, {
                method: 'post', mode: 'cors', headers: {
                    'Content-Type': 'application/json',
                    'X-Id': session.user_id,
                    'X-Session-Type': session.origin,
                    'X-Token': session.token
                }, body: JSON.stringify({ id: session.user_id })
            })
            .then(response => {
                // console.log(response)
                if(!response.ok) {
                    throw 'Ocurrió un error, intente nuevamente';
                }
                return response;
            })
            .then(json => {
                // localStorage.setItem('logged', false);
                // Cookies.remove('session');
                // Cookies.set('session', {
                //     id: id,
                //     logged: false,
                //     status: "Not Logged"
                // });
    
                dispatch({ type: 'LOGOUT', payload: { id } })
                dispatch({ type: 'LOADING_OFF' });
            })
            .catch(error => {
                // console.log('catch fetch error: ', error);
                dispatch({ type: 'ERROR', payload: { error: "Ocurrió un error, intente nuevamente" } })
                dispatch({ type: 'LOADING_OFF' });
            })
        } catch (error) {
            // console.log(error)
            dispatch({ type: 'ERROR', payload: { error: "Ocurrió un error, intente nuevamente" } })
            dispatch({ type: 'LOADING_OFF' });
        }
    }
}

export function setSessionState(data) {
    return function(dispatch) {
        dispatch({ type: 'SET_SESSION_STATE', payload: { data } })
    }
}