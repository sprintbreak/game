import React from 'react'
import { connect } from 'react-redux';
import { Container } from './styled';
import Button from './../Button/Button';
import logo from './../../../../assets/img/logo.png';
import { logout } from './../../../modules/store/actions/loginActions';
import { leaveRoom, status } from './../../../modules/store/actions/roomActions';
import { useHistory } from 'react-router-dom';

const Header = ({ id, logged, inRoom, logout, leaveRoom, nickname, session, status, rooms, playingPlayers, waitingPlayers }) => {

    React.useEffect(() => {
        status();
    }, [rooms, playingPlayers, waitingPlayers])

    const history = useHistory();

    const handleSignOutClick = () => {
        logout(id, session)
        .then(() => history.push("/"));
    }
    
    const handleLeaveRoomClick = () => {
        leaveRoom(id, session)
        .then(() => history.push("/home"));
    }

    return (
        <Container>
            <header className="header_area">
                <div className="status-wrapper">
                    <p>Salas activas: {rooms}</p> | <p>Jugadores activos: {playingPlayers}</p> | <p>Jugadores en espera: {waitingPlayers}</p>
                </div>
                <div className="main_menu">
                    <nav className="navbar navbar-expand-lg w-100">
                        <div className="container">
                            <a className="navbar-brand" href="/">
                            {/* <a className={ id ? "navbar-brand-username" : "navbar-brand" } href="/"> */}
                                <img src={logo} alt="Sprint Break" />
                            </a>

                            <div className="nickname">
                                <p>Usuario: {nickname}</p>
                            </div>

                            <div className="btn-salir">
                                { inRoom && <Button onClick={handleLeaveRoomClick}>Abandonar</Button> }
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
        id: state.appReducer.user_id,
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
