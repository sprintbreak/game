import { RandomHelper } from './../../../shared/helpers/RandomHelper';
import Cookies from 'js-cookie';

const randomHelper = new RandomHelper();

const INITIAL_STATE = {
    accumulatedPoints: 0,
    chooseCardLimit: '',
    chooseWinnerLimit: '',
    dateLimit: '',
    error: '',
    id: '',
    inRound: false,
    inRoom: false,
    loading: false,
    loadingRoom: false,
    logged: false,
    messages: [],
    nickname: '',
    playerLeaved: {
        id: '',
        name: ''
    },
    playerType: '',
    players: {},
    playingPlayers: 0,
    points: 0,
    redCard: { 
        content: '' 
    },
    room: '',
    rooms: 0,
    roomLeaved: false,
    roundLimit: '',
    selectedCard: 0,
    selectedCards: [],
    selectedWinnerCard: 0,
    session: {
        user_id: '',
        token: '',
        expires: '',
        code: '',
        origin: '',
        origin_id: '',
        username: ''
    },
    statusPlayer: 'Initialized',
    statusLogin: '',
    statusRoom: '',
    statusRound: '',
    submitted: false,
    superpoints: 0,
    type: '',
    user_id: '',
    waitingPlayers: 0,
    whiteCards: [],
    winner: null,
    websocket: null,
    winnerSubmitted: false,
}

export function appReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'CARD_SUBMITTED': {
            // console.log(state.selectedCards)
            const { data } = action.payload;
            return {
                ...state,
                selectedCards: [
                    ...state.selectedCards,
                    { 
                        id: data.card.id, 
                        content: data.card.content,
                    }
                ],
            }
        }
        case 'ERROR': {
            const { error } = action.payload;
            return {
                ...state,
                error
            }
        }
        case 'INITIALIZE_PLAYER': {
            return {
                ...state,
                error: '',
                id: action.payload.id,
                redCard: {
                    content: '' 
                },
                whiteCards: [],
                statusPlayer: 'Initialized',
                type: '',
                inRoom: false,
                selectedCard: 0,
                winner: null,
                roundLimit: '',
                chooseCardLimit: '',
                chooseWinnerLimit: ''
            }
        }
        case 'LOADING_ON': {
            return {
                ...state,
                loading: true
            }
        }
        case 'LOADING_OFF': {
            return {
                ...state,
                loading: false
            }
        }
        case 'LOADING_ROOM_ON': {
            return {
                ...state,
                loadingRoom: true
            }
        }
        case 'LOADING_ROOM_OFF': {
            return {
                ...state,
                loadingRoom: false
            }
        }
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                id: action.payload.response.id,
                error: '',
                statusLogin: action.payload.status,
                logged: action.payload.logged,
                user_id: action.payload.response.id,
                nickname: action.payload.response.username,
                points: action.payload.response.points,
                superpoints: action.payload.response.superpoints,
                session: {
                    ...state.session,
                    user_id: action.payload.response.id,
                    token: action.payload.response.token,
                    expires: action.payload.response.expires,
                    username: action.payload.response.username,
                }
            }
        }
        case 'LOGIN_ERROR': {
            return {
                ...state,
                statusLogin: 'Login error',
                logged: false,
                error: action.payload.error,
                session: {},
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                error: '',
                statusLogin: 'Logged out',
                logged: false,
                user_id: '',
                session: {},
                superpoints: '',
                points: '',
            }
        }
        case 'NEW_MESSAGE': {
            return {
                ...state,
                error: '',
                messages: [
                    ...state.messages,
                    { ...action.payload.data }
                ],
            }
        }
        case 'ROOM_JOINED': {
            return {
                ...state,
                error: '',
                room: action.payload.response.room_id,
                statusRoom: action.payload.status,
                inRoom: true,
            }
        }
        case 'ROOM_NOT_JOINED': {
            return {
                ...state,
                error: action.payload.error,
            }
        }
        case 'ROOM_CLOSED': {
            return {
                ...state,
                error: '',
                room: '',
                statusRoom: 'Closed',
                inRoom: false,
                accumulatedPoints: 0,
                selectedCard: 0,
                winner: {
                    id: action.payload.data.winner_id
                },
                roundLimit: "",
                chooseCardLimit: "",
                chooseWinnerLimit: ""
            }
        }
        case 'ROOM_LEAVED': {
            return {
                error: '',
                room: '',
                roomLeaved: true,
                statusRoom: 'Leaved',
                inRoom: false,
                inRound: false,
                accumulatedPoints: 0,
                selectedCard: 0,
                winner: null,
                roundLimit: "",
                chooseCardLimit: "",
                chooseWinnerLimit: "",
                playerLeaved: {
                    id: action.payload.session.id,
                    name: action.payload.session.username
                },
            }
        }
        case 'ROUND_NEW': {
            const { data } = action.payload;
            // console.log('Round new:', data);
            if(data.player_type === "hand") {
                return {
                    ...state,
                    redCard: data.red_card,
                    whiteCards: [],
                    dateLimit: data.date_limit,
                    playerType: 'Hand',
                    statusRound: "Playing",
                    selectedCard: 0,
                    selectedCards: [],
                    submitted: false,
                    winner: null,
                    winnerSubmitted: false,
                    roundLimit: data.round_limit,
                    chooseCardLimit: data.choose_card_limit,
                    chooseWinnerLimit: data.choose_winner_limit,
                    accumulatedPoints: data.accumulated_points,
                    inRound: true,
                    players: data.players,
                }
            } else if (data.player_type === 'player') {
                return {
                    ...state,
                    redCard: data.red_card,
                    whiteCards: data.cards,
                    dateLimit: data.date_limit,
                    playerType: 'Player',
                    statusRound: "Playing",
                    selectedCard: 0,
                    selectedCards: [],
                    submitted: false,
                    winner: null,
                    winnerSubmitted: false,
                    roundLimit: data.round_limit,
                    chooseCardLimit: data.choose_card_limit,
                    chooseWinnerLimit: data.choose_winner_limit,
                    accumulatedPoints: data.accumulated_points,
                    inRound: true,
                    players: data.players,
                }
            } else {
                return {
                    ...state,
                }
            }
        }
        case 'SET_SESSION_STATE': {
            return {
                ...state,
                nickname: action.payload.data.nickname,
                session: {
                    ...state.session,
                    code: action.payload.data.code,
                    origin: action.payload.data.origin,
                    origin_id: action.payload.data.origin_id,
                    token: action.payload.data.token,
                    username: action.payload.data.username,
                }
            }
        }
        case 'SET_WEBSOCKET': {
            return {
                ...state,
                websocket: action.payload.ws,
            }
        }
        
        
        case 'SET_NICKNAME': {
            const { nickname } = action.payload;
            return {
                ...state,
                nickname,
            }
        }
        case 'SELECT_CARD': {
            return {
                ...state,
                selectedCard: action.payload.card,
            }
        }
        
        case 'SET_NICKNAME': {
            return {
                ...state,
                nickname: action.payload.nickname,
            }
        }
        case 'SEND_MESSAGE': {
            return {
                ...state,
                messages: [
                    ...state.messages,
                    { 
                        message: action.payload.message,
                        username: action.payload.username,
                    }
                ],
            }
        }
        case 'STATUS': {
            return {
                ...state,
                rooms: action.payload.rooms,
                playingPlayers: action.payload.playingPlayers,
                waitingPlayers: action.payload.waitingPlayers
            }
        }
        case 'SUBMIT_CARD': {
            return {
                ...state,
                submitted: true,
            }
        }
        case 'SUBMIT_WINNER': {
            return {
                ...state,
                submitted: true,
            }
        }
        case 'UPDATE_PROFILE': {
            return {
               ...state 
            }
        }
        case 'UPDATE_STATS': {
            return {
                ...state,
                points: action.payload.data.points,
                superpoints: action.payload.data.superpoints
            }
        }
        case 'WINNER_SUBMITTED': {
            // console.log('Winner submitted: ', action.payload);
            return {
                ...state,
                winnerSubmitted: true,
                submitted: true,
                selectedWinnerCard: action.payload.data.card,
                winner: {
                    card: action.payload.data.card,
                    player: action.payload.data.winner,
                }
            }
        }
        default: {
            return {
                ...state,
            }          
        }
    }
}


// if(typeof Cookies.get('session') !== "undefined") {
//     const cookiesSession = JSON.parse(Cookies.get('session'));
//     return {
//         ...state,
//         id: cookiesSession.id,
//         statusLogin: cookiesSession.status,
//         logged: cookiesSession.logged,
//         nickname: cookiesSession.nickname,
//         session: {
//             ...state.session,
//             user_id: cookiesSession.id,
//             token: cookiesSession.token,
//             origin: cookiesSession. origin,
//             expires: cookiesSession.expires,
//             username: cookiesSession.nickname,
//         }
//     }
// } else {
//     return {
//         ...state,
//     }
// }  