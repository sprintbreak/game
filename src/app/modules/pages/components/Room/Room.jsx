import React, { useState } from 'react';
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
import Websocket from 'react-websocket';
import { DateHelper } from './../../../../shared/helpers/DateHelper'
import { RandomHelper } from './../../../../shared/helpers/RandomHelper';
import { ActionsWrapper, CardsWrapper, Container, PageContainer } from './styled';
import { sendMessage } from './../../../store/actions/chatActions';
import { initializePlayer } from './../../../store/actions/playerActions';
import { authenticateWs } from './../../../store/actions/loginActions';
import { wsDispatch } from './../../../store/actions/wsActions';
import { selectCard, submitCard, submitWinner } from './../../../store/actions/roundActions';

const dateHelper = new DateHelper();
const randomHelper = new RandomHelper();

const Room = props => {

    const history = useHistory();
    const ws = React.createRef();
    const chat = React.createRef();

    const [inSelected, setInSelected] = useState(false);
    const [selectedCardLocal, setSelectedCardLocal] = useState({
        id: '',
        content: '',
    });

    const [win, setWin] = useState(false);
    const [timerPlayer, setTimerPlayer] = useState(true);
    const [timerHand, setTimerHand] = useState(false);
    const [finishRoom, setFinishRoom] = useState(false);
    
    React.useEffect(() => {
        if(props.selectedCards) {
            if(props.selectedCards.length > 1) setTimerHand(true);
        }
    }, [props.selectedCards])

    React.useEffect(() => {
        if(props.statusRoom) {
            if(props.statusRoom === "Closed") {
                setFinishRoom(true);
            }
        }
    }, [props.statusRoom])

    React.useEffect(() => {
        resetState();
    }, [props.redCard])

    React.useEffect(() => {
        if(props.winner) {
            if(props.winner.player === props.id) {
                setWin(true);
            }
        }
    }, [props.winner])

    const resetState = () => {
        setInSelected(false);
        setSelectedCardLocal({
            id: '',
            content: '',
        })
        setWin(false);
        setTimerPlayer(true);
        setTimerHand(false);
    }    

    const secondsLeft = dateHelper.calculateSecondsLeftTo(props.roundLimit, props.chooseCardLimit, props.chooseWinnerLimit)

    const handleSelectCard = card => {
        const { submitCard, id, session, room } = props;
        setInSelected(true);
        setTimerPlayer(false);
        setSelectedCardLocal(card);
        submitCard(id, session, room, card.id);
    }

    const handleSelectWinner = card => {
        const { id, session, room, submitWinner } = props;
        setInSelected(true);
        setTimerPlayer(false);
        submitWinner(id, session, room, card.id);
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

                <Chat sendMessage={handleMessageClick} messages={props.messages} nickname={props.nickname} />

                <ModalRoom
                    active={finishRoom}
                    // content={`Esta mesa ha finalizado. Ganó el jugador: ${props.winner.player}`}
                    content={`Esta mesa ha finalizado.`}
                    onSuccess={()=>history.replace("/home")}
                    />
                

                { !props.inRound && (
                    <h4>El juego está por comenzar!</h4>
                ) }

                { props.inRound && (<div className="play-container">

                    { props.playerType === "Hand" && <h4>SOS SCRUM MASTER</h4> }
                    { props.playerType === "Player" && <h4>SOS JUGADOR</h4> }

                    <CardsWrapper>

                        { !inSelected ? (<Card
                            key={props.redCard.id}
                            id={props.redCard.id}
                            color="roja"
                            text={props.redCard.content}
                            />) : (
                            <div className="played-card">
                                <Card
                                key={props.redCard.id}
                                id={props.redCard.id}
                                color="roja"
                                text={props.redCard.content}
                                />
                                { props.playerType === "Player" && <p className="mensaje">Pregunta de la casa</p> }
                            </div>
                        ) }

                        { props.playerType === 'Hand' && (props.selectedCards.length > 0 ? (
                            props.selectedCards.map(card => <Card
                                key={card.id}
                                id={card.id}
                                color="blanca"
                                text={card.content}
                                onClick={handleSelectWinner}
                            />)
                        ) : (
                            <>
                            <Card />
                            <Card />
                            <Card />
                            </>
                        ))}

                        { props.playerType === 'Player' && !inSelected && (
                            props.whiteCards.map(card => <Card
                                key={card.id} 
                                id={card.id}
                                color="blanca" 
                                text={card.content}
                                onClick={handleSelectCard}
                            />)
                        )}

                        { props.playerType === "Player" && inSelected ? 

                        (<div className="playing-cards">

                            <div className="played-card">
                                <Card
                                key={selectedCardLocal.id}
                                id={selectedCardLocal.id}
                                color="blanca"
                                text={selectedCardLocal.content}
                                />
                                <p className="mensaje">Vos elegiste</p>
                            </div>

                            <div className="played-card">

                                { props.winner ? (<Card 
                                key={props.winner.card.id} 
                                id={props.winner.card.id}
                                color="blanca"
                                text={props.winner.card.content}
                                selected={true}
                                win={win}
                                />) : <CardBack /> }

                                { props.winner ? 
                                (<p className="mensaje">La casa eligió</p>) : 
                                (<p className="mensaje">La casa elige</p>) }

                            </div>
                        </div>
                        ) : null }
                        
                    </CardsWrapper>
                    <ActionsWrapper>
                        { timerPlayer && props.playerType === 'Player' && <Timer time={secondsLeft.seconds_to_card_limit} onComplete={()=>{}} /> }
                        { timerHand && props.playerType === 'Hand' && <Timer color="#2ECC71" time={secondsLeft.seconds_to_winner_limit} onComplete={()=>{}} /> }
                        <Score label="Puntos:" score={props.accumulatedPoints} />
                        <Score label="Superpuntos:" score={ props.superpoints === '' ? '0' : props.superpoints } />
                    </ActionsWrapper>
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
        submitWinner: (id, session, room, card) => dispatch(submitWinner(id, session, room, card))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Room);
