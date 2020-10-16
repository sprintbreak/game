import React, { useState } from 'react';
import { connect } from 'react-redux';
import config from '../../../../config/config';
import Card from './../../../components/Card/Card';
import Header from './../../../components/Header/Header';
import Score from './../../../components/Score/Score';
import Timer from './../../../components/Timer/Timer';
import Chat from './../../../components/Chat/Chat';
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
    
    React.useEffect(() => {
        if(props.inRound) console.log(props);
    }, [props.inRound])

    React.useEffect(() => {
        console.log(props.winner);
    }, [props.winner])

    const ws = React.createRef();
    const chat = React.createRef();

    const [inSelected, setInSelected] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(0);
    const [win, setWin] = useState(false);
    const [timer, setTimer] = useState(true);

    const secondsLeft = dateHelper.calculateSecondsLeftTo(props.roundLimit, props.chooseCardLimit, props.chooseWinnerLimit)

    const handleSelectCard = selectedCard => {
        const { submitCard, id, session, room } = props;
        console.log('Carta seleccionada: ', selectedCard);
        setInSelected(true);
        submitCard(id, session, room, selectedCard);
    }

    const handleSelectWinner = selectedCard => {
        const { id, session, room, submitWinner } = props;
        console.log('Carta ganadora: ', selectedCard);
        setInSelected(true);
        submitWinner(id, session, room, selectedCard);
    }

    // const handleSelectRandomCard = () => {
    //     const { submitCard, id, session, room, whiteCards } = props;
    //     const randomCard = whiteCards[randomHelper.getRandomInt(0, whiteCards.length)];
    //     console.log('random card: ', randomCard);
    //     // submitCard(id, session, room, randomCard)
    // }

    // const handleSelectRandomWinner = () => {
    //     const { submitCard, id, session, room, whiteCards } = props;
    //     const randomWinner = whiteCards[randomHelper.getRandomInt(0, whiteCards.length)];
    //     console.log('random winner: ', randomWinner);
    //     // submitCard(id, session, room, randomWinner)
    // }

    const handleMessageClick = message => {
        props.sendMessage(props.id, props.session, message);
    }

    const wsOpen = () => props.authenticateWs(ws.current, props.session);

    const wsClose = data => console.log('WS Close', data);

    const wsData = data => {
        console.log('WS Recieved: ', data);
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
                
                { !props.inRound && (
                    <h4>Esperando a los demás jugadores...</h4>
                ) }

                { props.inRound && (<div className="play-container">                
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
                                <p className="mensaje">Pregunta de la casa</p>
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
                                key={props.whiteCards[selectedCardId].id} 
                                id={props.whiteCards[selectedCardId].id}
                                color="blanca"
                                text={props.whiteCards[selectedCardId].content}
                                />
                                <p className="mensaje">Vos elegiste</p>
                            </div>

                            <div className="played-card">

                                { props.selectedWinnerCard ? (<Card 
                                key={props.selectedWinnerCard.id} 
                                id={props.selectedWinnerCard.id}
                                color="blanca"
                                text={props.selectedWinnerCard.content}
                                selected={true}
                                win={win}
                                />) : <Card /> }

                                { props.selectedWinnerCard ? 
                                (<p className="mensaje">La casa eligió</p>) : 
                                (<p className="mensaje">La casa elige</p>) }

                            </div>
                        </div>
                        ) : null }
                        
                    </CardsWrapper>
                    <ActionsWrapper>
                        { props.playerType === 'Player' && <Timer time={secondsLeft.seconds_to_card_limit} onComplete={()=>{}} /> }
                        { props.playerType === 'Hand' && <Timer time={secondsLeft.seconds_to_winner_limit} onComplete={()=>{}} /> }
                        <Score score={props.points} />
                    </ActionsWrapper>
                </div>)}
                <Chat sendMessage={handleMessageClick} username={props.id} messages={props.messages} ref={chat} />
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
