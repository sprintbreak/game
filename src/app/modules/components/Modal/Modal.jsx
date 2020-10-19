import React, { useState } from 'react'
import { 
    StyledModal, 
    StyledModalActions, 
    StyledModalContainer, 
    StyledModalContent,
    StyledModalOverlay  
} from './styled';
import Button from './../Button/Button';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { room } from './../../store/actions/index';


const Modal = ({ active, onCancel, joinRoom, session }) => {

    const [value, setValue] = useState(null);
    const history = useHistory();

    const handleOnChange = e => {
        setValue(e.target.value);
    }

    const handleSuccess = () => {
        // setNickname(value);
        joinRoom(session.user_id, session);
        history.replace("/room");
    }

    return (active &&
        <StyledModalContainer>
            <StyledModalOverlay />
            <StyledModal>
                <StyledModalContent>
                    <h4>Por favor, ingresá tu nombre para jugar</h4>
                    <TextField name="username" label="Username" onChange={handleOnChange} />
                </StyledModalContent>
                <StyledModalActions>
                    <Button className="button" onClick={onCancel}>Cancelar</Button>
                    <Button className="button" onClick={handleSuccess}>Confirmar</Button>
                </StyledModalActions>
            </StyledModal>
        </StyledModalContainer>
    )
}

const mapStateToProps = state => {
    return {
        session: state.appReducer.session
    }
}

const mapDispatchToProps = dispatch => {
    return {
        joinRoom: (id, session) => dispatch(room.actionJoinRoom(id, session)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
