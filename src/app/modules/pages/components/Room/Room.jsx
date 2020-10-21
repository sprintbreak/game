import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../../../config/config';
import Card from './../../../components/Card/Card';
import CardBack from './../../../components/Card/CardBack';
import Header from './../../../components/Header/Header';
import Score from './../../../components/Score/Score';
import Timer from './../../../components/Timer/Timer';
import Chat from './../../../components/Chat/Chat'; 
import ModalRoom from './../../../components/Modal/ModalRoom';
import Eye from './../../../components/Eye/Eye';
import Websocket from 'react-websocket';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import GameRules from './../../../components/GameRules/GameRules';
import ModalRules from './../../../components/Modal/ModalRules';
import { DateHelper } from './../../../../shared/helpers/DateHelper'
import { RandomHelper } from './../../../../shared/helpers/RandomHelper';
import { ActionsWrapper, CardsWrapper, Container, PageContainer } from './styled';
import { sendMessage } from './../../../store/actions/chatActions';
import { initializePlayer } from './../../../store/actions/playerActions';
import { authenticateWs } from './../../../store/actions/loginActions';
import { wsDispatch } from './../../../store/actions/wsActions';
import { selectCard, submitCard, submitWinner } from './../../../store/actions/roundActions';
import { joinRoom, leaveRoom } from './../../../store/actions/roomActions';

const dateHelper = new DateHelper();
const randomHelper = new RandomHelper();

const Room = props => {

    const history = useHistory();
    const ws = React.createRef();
    const chat = React.createRef();

    const [onSelectedPlayer, setOnSelectedPlayer] = useState(false);
    const [onSelectedScrum, setOnSelectedScrum] = useState(false);
    const [selectedCardLocal, setSelectedCardLocal] = useState({
        id: '',
        content: '',
    });
    const [win, setWin] = useState(false);
    const [timerPlayer, setTimerPlayer] = useState(true);
    const [timerHand, setTimerHand] = useState(false);
    const [finishRoom, setFinishRoom] = useState(false);
    const [allCardsSelected, setAllCardsSelected] = useState(false);
    const [showScrumAllCards, setShowScrumAllCards] = useState(false);
    const [winnerSelected, setWinnerSelected] = useState(false);
    const [winnerPlayer, setWinnerPlayer] = useState(false);
    const [modalRoom, setModalRoom] = useState(false);
    const [waitingScrum, setWaitingScrum] = useState(false);
    const [modalRules, setModalRules] = useState(false);
    const [startPlay, setStartPlay] = useState(false);

    React.useEffect(() => {
        if(!props.inRoom) {
            setStartPlay(false);
            setFinishRoom(true);
        }
    }, [props.inRoom])

    React.useEffect(() => {
        if(props.winnerSubmitted) {
            // console.log('winnerSubmitted: ', props.winnerSubmitted);
            // console.log('winner: ', props.winner);
            setWinnerSelected(true);
            if(props.winner) {
                if(props.winner.player === props.id) {
                    setWin(true);
                }
            }
        }
    }, [props.winnerSubmitted])

    React.useEffect(() => {
        // console.log('inRound: ', props.inRound);
        if(!props.inRound) setStartPlay(false);
    }, [props.inRound])

    // React.useEffect(() => {
    //     if(props.roomLeaved) {
    //         if(props.playerLeaved.id) {
    //             if(props.playerLeaved.id !== '') {
    //                 setShowPlayerLeaved(true);
    //             }
    //         }
    //     }
    // }, [props.roomLeaved])
    
    React.useEffect(() => {
        // Aca validar la cantidad de cartas con la cantidad de jugadores
        // Y en caso de que sean iguales activar el ojo para verlas
        if(props.selectedCards) {
            // console.log('selectedCards: ', props.selectedCards);
            // if(props.selectedCards.length > 0) setWaitingScrum(true);
            if(props.selectedCards.length === props.players.length - 1) {
                setWaitingScrum(true)
                setAllCardsSelected(true);
                setTimerHand(true);
            }
        }
    }, [props.selectedCards])

    React.useEffect(() => {
        if(props.statusRound !== '') {
            if(props.statusRound === "Playing") {
                if(props.playerType === "Hand") {
                    // setEyeView(true);
                }
            }
        }
    }, [props.statusRound])

    React.useEffect(() => {
        if(props.statusRoom) {
            if(props.statusRoom === "Closed") {
                setFinishRoom(true);
                setModalRoom(true);
                if(props.winner) {
                    setWinnerPlayer(props.winner.id);
                    // console.log('El ganador fue:', props.winner.id);
                }
            }
            // if(props.statusRoom === "Leaved") {
            //     history.replace("/home");
            // }
        }
    }, [props.statusRoom])

    React.useEffect(() => {
        // console.log('Players: ', props.players);
        resetState();
        // if(props.redCard);
        setStartPlay(true);
    }, [props.redCard])

    React.useEffect(() => {
        // console.log('Submitted: ', props.submitted);
    }, [props.submitted])

    React.useEffect(() => {
        if(props.winner) {
            if(typeof props.winner.player !== "undefined" ||
            props.winner.player !== null) {
                setWinnerSelected(true);
                setTimerHand(false);
                if(props.winner.player === props.id) {
                    setWin(true);
                }
            }
        }
    }, [props.winner])

    const handleEyeClick = () => {
        if(!showScrumAllCards) {
            setShowScrumAllCards(true);
        } else {
            setShowScrumAllCards(false);
        }
    }

    const resetState = () => {
        setSelectedCardLocal({
            id: '',
            content: '',
        })
        setOnSelectedPlayer(false);
        setWin(false);
        setTimerPlayer(true);
        setTimerHand(false);
        setAllCardsSelected(false);
        setWinnerSelected(false);
        setShowScrumAllCards(false);
        setModalRoom(false);
        setModalRules(false);
        setFinishRoom(false);
        setWaitingScrum(false);
    }    

    const secondsLeft = dateHelper.calculateSecondsLeftTo(props.roundLimit, props.chooseCardLimit, props.chooseWinnerLimit)

    const handleSelectCard = card => {
        const { submitCard, id, session, room } = props;
        setOnSelectedPlayer(true);
        setTimerPlayer(false);
        setSelectedCardLocal(card);
        submitCard(id, session, room, card.id);
    }

    const handleSelectWinner = card => {
        const { id, session, room, submitWinner } = props;
        setOnSelectedScrum(true);
        setTimerHand(false);
        submitWinner(id, session, room, card.id);
    }

    const handleJoinRoom = () => {
        setModalRoom(false);
        props.joinRoom(props.id, props.session, ws.current).then(() => history.replace("/room"));
    }

    const handleMessageClick = message => {
        props.sendMessage(props.id, props.session, message);
    }

    const wsOpen = () => props.authenticateWs(ws.current, props.session);

    const wsClose = data => {};

    const wsData = data => {
        props.dispatchWs(props.id, data, { props, ws: ws.current });
    }

    const wsDataError = (data) => {
        console.error("WS Error", data)
    }

    return (
        <PageContainer>
            <Websocket url={config.api.ws_url}
                debug={false}
                reconnect={true}
                onOpen={wsOpen}
                onClose={wsClose}
                onMessage={wsData}
                onError={wsDataError}
                ref={ws}
            />
            <Header />
            <Container>

                <ModalRules active={modalRules}
                 onSuccess={() => setModalRules(false)}
                 buttonText="Cerrar"
                 />

                <ModalRoom active={modalRoom}
                    content={`${ winnerPlayer === props.id ? 
                        "¡Felicidades! Acumulaste 3 puntos y ganaste la mesa." : 
                        "Alguien acumuló 3 puntos y ganó la partida, ¡qué tengas mejor suerte la próxima!" 
                    }`}
                    buttonText="Cancelar"
                    onCancel={()=>history.replace("/home")}
                    onSuccess={handleJoinRoom}
                />

                <GameRules onClick={() => setModalRules(true)} />

                <div className="score">
                    {/* { props.playerType === 'Player' && <Timer time={secondsLeft.seconds_to_card_limit} onComplete={()=>{}} /> } */}
                    { timerPlayer && props.playerType === 'Player' && <Timer time={secondsLeft.seconds_to_card_limit} onComplete={()=>{}} /> }
                    { timerHand && props.playerType === 'Hand' && <Timer color="#2ECC71" time={secondsLeft.seconds_to_winner_limit} onComplete={()=>{}} /> }
                    <Score type="puntos" label="Puntos de ronda:" score={props.accumulatedPoints === '' ? '0' : props.accumulatedPoints } />
                    <Score type="puntosAcu" label="Puntos acumulados:" score={props.points === '' ? '0' : props.points } />
                    <Score type="superpuntos" label="Superpuntos:" score={ props.superpoints === '' ? '0' : props.superpoints } />  
                </div>


                {/* <Chat sendMessage={handleMessageClick} messages={props.messages} nickname={props.nickname} /> */}

                {/* <Snackbar open={showPlayerLeaved} 
                message={`${props.playerLeaved.name} ha abandonado la mesa`}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={3000}
                onClose={()=>setShowPlayerLeaved(false)} 
                /> */}                

                { !props.inRound && (
                    <div className="loader-round">
                        <h4>¡El juego está por comenzar!</h4>
                        <PuffLoader
                            size={100}
                            color="#ec0000"
                            loading={true}
                        />
                    </div>
                ) }

                { props.inRound && !startPlay && (
                    <ModalRoom active={true}
                    content="Disculpa las molestias. La mesa se cerró por un problema de conexión. ¡Volvé a intentarlo!"
                    onSuccess={()=>history.replace("/home")}
                />
                )}

                { props.inRound && startPlay && (<div className="play-container">

                    <div className="instructions">
                        { props.playerType === "Hand" && <h4>SCRUM MASTER</h4> }
                        
                        { props.playerType === "Hand" && !allCardsSelected && 
                                <p>Las personas que integran el Scrum estan eligiendo su mejor carta</p> }

                        { props.playerType === "Hand" && allCardsSelected && !showScrumAllCards && 
                                <p>Hacé clic en el ojito para ver qué cartas se jugaron</p> }
                        
                        { props.playerType === "Hand" && allCardsSelected && showScrumAllCards && 
                                <p>Elegí la que más te gusta, el criterio lo pones vos</p> }

                        { props.playerType === "Player" && <h4>INTEGRANTE DEL SCRUM</h4> }

                        { props.playerType === "Player" && !allCardsSelected && !onSelectedPlayer &&
                                <p>Elegí de tus cartas la que creas que mejor completa la consigna</p> }

                        { props.playerType === "Player" && onSelectedPlayer && !winnerSelected && !waitingScrum &&
                                <p>¡Buena elección! Tu carta permanecerá boca abajo hasta que el resto haya jugado</p> }

                        { props.playerType === "Player" && onSelectedPlayer && waitingScrum && !winnerSelected &&
                                <p>Scrum Master está por elegir la mejor carta</p>}

                        { props.playerType === "Player" && winnerSelected &&
                                <p>El scrum master eligió</p> }

                    </div>


                    <CardsWrapper>

                        <div className="played-card">
                            { props.playerType === "Player" && <p className="mensaje">Consigna</p> }
                            <Card
                            key={props.redCard.id}
                            id={props.redCard.id}
                            color="roja"
                            text={props.redCard.content}
                            />
                        </div>

                        {/* SCRUM MASTER */}

                        { props.playerType === 'Hand' &&
                        
                            (allCardsSelected ? (
                                showScrumAllCards ?
                                (props.selectedCards.map(card => <Card
                                    scrum={true}
                                    key={card.id}
                                    id={card.id}
                                    color="blanca"
                                    text={card.content}
                                    onClick={handleSelectWinner}
                                />)) : 
                                (Array.from({ length: props.selectedCards.length }, (_, index) => (
                                    <CardBack scrum={true} key={index} />
                                )))
                            ) : (
                                <>
                                {Array.from({ length: props.players.length -1 }, (_, index) => (
                                    <Card key={index} />
                                ))}
                                </>
                            ))

                        }

                        { props.playerType === "Hand" && (
                            <Eye active={allCardsSelected} onClick={handleEyeClick} />
                        ) }

                        {/* JUGADOR */}

                        { props.playerType === "Player" && !onSelectedPlayer && 
                            props.whiteCards.map(card =>
                                <Card 
                                key={card.id}
                                id={card.id}
                                color="blanca"
                                text={card.content}
                                onClick={handleSelectCard}
                            />) 
                        }

                        { props.playerType === "Player" && onSelectedPlayer && 

                            (winnerSelected ? (
                                <Card
                                color="blanca"
                                key={props.selectedWinnerCard.id}
                                id={props.selectedWinnerCard.id} 
                                text={props.selectedWinnerCard.content}
                                selected={true}
                                win={win}
                                />
                            ) : (
                                (Array.from({ length: props.selectedCards.length + 1 }, (_, index) => (
                                    <CardBack key={index} />
                                )))
                            ))
                        
                        }
                        
                    </CardsWrapper>
                </div>)}
                {/* <Chat sendMessage={handleMessageClick} username={props.nickname} messages={props.messages} ref={chat} /> */}
            </Container>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        accumulatedPoints: state.appReducer.accumulatedPoints,
        chooseCardLimit: state.appReducer.chooseCardLimit,
        chooseWinnerLimit: state.appReducer.chooseWinnerLimit,
        dateLimit: state.appReducer.dateLimit,
        error: state.appReducer.error,
        id: state.appReducer.id,
        inRound: state.appReducer.inRound,
        messages: state.appReducer.messages,
        nickname: state.appReducer.nickname,
        players: state.appReducer.players,
        playerType: state.appReducer.playerType,
        points: state.appReducer.points,
        redCard: state.appReducer.redCard,
        room: state.appReducer.room,
        roomLeaved: state.appReducer.roomLeaved,
        playerLeaved: state.appReducer.playerLeaved,
        roundLimit: state.appReducer.roundLimit,
        selectedCard: state.appReducer.selectCard,
        selectedCards: state.appReducer.selectedCards,
        selectedWinnerCard: state.appReducer.selectedWinnerCard,
        session: state.appReducer.session,
        statusLogin: state.appReducer.statusLogin,
        statusPlayer: state.appReducer.statusPlayer,
        statusRoom: state.appReducer.statusRoom,
        statusRound: state.appReducer.statusRound,
        submitted: state.appReducer.submitted,
        superpoints: state.appReducer.superpoints,
        whiteCards: state.appReducer.whiteCards,
        winner: state.appReducer.winner,
        winnerSubmitted: state.appReducer.winnerSubmitted,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateWs: (ws, session) => dispatch(authenticateWs(ws, session)),
        dispatchWs: (id, data, { props, ws }) => dispatch(wsDispatch(id, data, { props, ws })),
        initializePlayer: (id) => dispatch(initializePlayer(id)),
        selectCard: (id, card) => dispatch(selectCard(id, card)),
        sendMessage: (id, session, message) => dispatch(sendMessage(id, session, message)),
        submitCard: (id, session, room, card) => dispatch(submitCard(id, session, room, card)),
        submitWinner: (id, session, room, card) => dispatch(submitWinner(id, session, room, card)),
        joinRoom: (id, session, ws) => dispatch(joinRoom(id, session, ws)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Room);
