import React from 'react'
import { connect } from 'react-redux';
import { Container } from './styled';
import Button from './../Button/Button';
import logo from './../../../../assets/img/logo.png';
import { logout } from './../../../modules/store/actions/loginActions';
import { leaveRoom, status } from './../../../modules/store/actions/roomActions';
import { useHistory } from 'react-router-dom';

const Header = ({ id, logged, inRoom, logout, leaveRoom, nickname, session, status, rooms, playingPlayers, waitingPlayers }) => {
    
    const history = useHistory();

    React.useEffect(() => {
        status();
    }, [playingPlayers])

    React.useEffect(() => {
        if(!logged) history.replace("/login");
    }, [logged])

    // React.useEffect(() => {
    //     if(!inRoom) history.replace("/home");
    // }, [inRoom]);

    const handleSignOutClick = () => {
        logout(id, session);
    }
    
    const handleLeaveRoomClick = () => {
        history.push("/");
        // leaveRoom(id, session);
    }

    return (
        <Container>
            <header className="header_area">
                <div className="status-wrapper">
                    {/* <p>Salas activas: {rooms}</p> | <p>Jugadores activos: {playingPlayers}</p> | <p>Jugadores en espera: {waitingPlayers}</p> */}
                    <p>Hay {playingPlayers} personas jugando</p>
                </div>
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg w-100">
                        <div className="container">
                            <a className="navbar-brand" href="https://sprintbreak.github.io/">
                            {/* <a className={ id ? "navbar-brand-username" : "navbar-brand" } href="/game"> */}
                                <img src={logo} alt="Sprint Break" />
                            </a>

                            { nickname && (<div className="nickname">
                                <p>Tu usuario: {nickname}</p>
                            </div>) }

                            <div className="btn-salir">
                                { inRoom && <a href="https://sprintbreak.github.io/"><Button onClick={()=>{}}>Abandonar</Button></a> }
                                { !inRoom && <Button onClick={handleSignOutClick}>Logout</Button> }
                            </div>

                        </div>
                    </nav>
                </div>
            </header>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        id: state.appReducer.id,
        inRoom: state.appReducer.inRoom,
        nickname: state.appReducer.nickname,
        session: state.appReducer.session,
        rooms: state.appReducer.rooms,
        playingPlayers: state.appReducer.playingPlayers,
        waitingPlayers: state.appReducer.waitingPlayers,
        logged: state.appReducer.logged
    }
}

const mapDispatchToProps = dispatch => {
    return {
        leaveRoom: (id, session) => dispatch(leaveRoom(id, session)),
        logout: (id, session) => dispatch(logout(id, session)),
        status: () => dispatch(status())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
