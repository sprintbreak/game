import React, { useEffect, useState } from 'react'
import config from '../../../../config/config';
import { BtnHome, PageHome, ImgHome, PageContainer } from './styled';
import Button from './../../../components/Button/Button';
import { connect } from 'react-redux';
import Header from './../../../components/Header/Header';
import imgHome from './../../../../../assets/img/juego_crop.png';
import { authenticateWs, logout } from './../../../store/actions/loginActions';
import { joinRoom, leaveRoom } from './../../../store/actions/roomActions';
import { initializePlayer } from './../../../store/actions/playerActions';
import { wsDispatch } from './../../../store/actions/wsActions';
import { useHistory } from 'react-router-dom';
import Websocket from 'react-websocket';
import { Alert } from '@material-ui/lab'

const Home = props => {

    const { id, error, dispatchWs, session, initializePlayer, joinRoom, inRoom } = props;

    const history = useHistory();
    const ws = React.createRef();

    useEffect(() => {
        initializePlayer(id);
    }, [])

    // useEffect(() => {
    //     console.log(error);
    // }, [error])

    useEffect(() => {
        if(inRoom) history.replace("/room", ws.current);
    }, [inRoom])

    const handleJoinRoom = () => {
        joinRoom(id, session, ws.current);
    }

    const wsOpen = () => authenticateWs(ws.current, session);

    const wsClose = data => console.log('WS Close', data);

    const wsData = data => {
        console.log('WS Recieved: ', data);
        dispatchWs(id, data, { props, ws: ws.current });
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
            <PageHome>
                <ImgHome>
                    <img src={imgHome} alt="cartas-home" width="600" />
                </ImgHome>
                <BtnHome>
                    <Button className="main_btn" variant="outlined" onClick={handleJoinRoom}>Entrar al juego</Button>
                </BtnHome>
                { error && <Alert severity="error">{error}</Alert> }
            </PageHome>
        </PageContainer>
    )
}

const mapStateToProps = state => {
    return {
        error: state.appReducer.error,
        id: state.appReducer.id,
        inRoom: state.appReducer.inRoom,
        session: state.appReducer.session,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateWs: (ws, session) => dispatch(authenticateWs(ws, session)),
        dispatchWs: (id, data, { props, ws }) => dispatch(wsDispatch(id, data, { props, ws })),
        initializePlayer: (id) => dispatch(initializePlayer(id)),
        joinRoom: (id, session, ws) => dispatch(joinRoom(id, session, ws)),
        leaveRoom: (id, session, ws) => dispatch(leaveRoom(id, session, ws)),
        logout: (id, session) => dispatch(logout(id, session)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
