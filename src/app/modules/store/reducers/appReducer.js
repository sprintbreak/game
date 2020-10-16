import session from 'redux-persist/lib/storage/session';
import { RandomHelper } from './../../../shared/helpers/RandomHelper';

const randomHelper = new RandomHelper();

const INITIAL_STATE = {
    accumulatedPoints: '',
    chooseCardLimit: '',
    chooseWinnerLimit: '',
    dateLimit: '',
    error: '',
    id: '',
    inRound: false,
    inRoom: false,
    loading: false,
    logged: false,
    messages: [],
    nickname: '',
    playerType: '',
    players: {},
    playingPlayers: 0,
    points: '',
    redCard: { 
        content: '' 
    },
    room: '',
    rooms: 0,
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
    },
    statusPlayer: 'Initialized',
    statusLogin: '',
    statusRoom: '',
    statusRound: '',
    submitted: false,
    superpoints: '',
    type: '',
    user_id: randomHelper.getRandomId(),
    waitingPlayers: 0,
    whiteCards: [],
    winner: null,
    websocket: null,
}

export function appReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'CARD_SUBMITTED': {
            console.log(action.payload)
            return {
                ...state,
                selectedCards: [
                    ...state.selectedCards,
                    { ...action.payload.data.card }
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
                id: action.payload.id,
                redCard: {
                    content: '' 
                },
                whiteCards: [],
                points: '',
                superpoints: '',
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
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                statusLogin: action.payload.status,
                logged: action.payload.logged,
                user_id: action.payload.response.id,
                session: {
                    ...state.session,
                    user_id: action.payload.response.id,
                    token: action.payload.response.token,
                    expires: action.payload.response.expires
                }
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
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
                messages: [
                    ...state.messages,
                    { ...action.payload.data }
                ],
            }
        }
        case 'ROOM_JOINED': {
            return {
                ...state,
                room: action.payload.response.room_id,
                statusRoom: action.payload.status,
                inRoom: true,
            }
        }
        case 'ROOM_CLOSED': {
            return {
                ...state,
                room: '',
                statusRoom: 'Closed',
                inRoom: false,
                accumulatedPoints: 0,
                selectedCard: 0,
                winner: null,
                roundLimit: "",
                chooseCardLimit: "",
                chooseWinnerLimit: ""
            }
        }
        case 'ROOM_LEAVED': {
            return {
                room: '',
                statusRoom: 'Leaved',
                inRoom: false,
                accumulatedPoints: 0,
                selectedCard: 0,
                winner: null,
                roundLimit: "",
                chooseCardLimit: "",
                chooseWinnerLimit: "",
                inRound: false,
            }
        }
        case 'ROUND_NEW': {
            const { data } = action.payload;
            console.log('Round new:', data);
            if(data.player_type === "hand") {
                return {
                    ...state,
                    redCard: data.red_card,
                    whiteCards: [],
                    dateLimit: data.date_limit,
                    playerType: 'Hand',
                    status: "Playing",
                    selectedCard: 0,
                    submitted: false,
                    winner: null,
                    roundLimit: data.round_limit,
                    chooseCardLimit: data.choose_card_limit,
                    chooseWinnerLimit: data.choose_winner_limit,
                    accumulatedPoints: data.accumulated_points,
                    inRound: true,
                }
            } else if (data.player_type === 'player') {
                return {
                    ...state,
                    redCard: data.red_card,
                    whiteCards: data.cards,
                    dateLimit: data.date_limit,
                    playerType: 'Player',
                    status: "Playing",
                    selectedCard: 0,
                    submitted: false,
                    winner: null,
                    roundLimit: data.round_limit,
                    chooseCardLimit: data.choose_card_limit,
                    chooseWinnerLimit: data.choose_winner_limit,
                    accumulatedPoints: data.accumulated_points,
                    inRound: true,
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
                points: action.payload.points,
                superpoints: action.payload.data.superpoints
            }
        }
        case 'WINNER_SUBMITTED': {
            console.log('Winner submitted: ', action.payload);
            return {
                ...state,
                submitted: true,
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