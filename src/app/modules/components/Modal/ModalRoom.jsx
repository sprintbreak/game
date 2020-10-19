import React from 'react'
import { 
    StyledModal, 
    StyledModalActions, 
    StyledModalContainer, 
    StyledModalContent,
    StyledModalOverlay  
} from './styled';
import Button from '../Button/Button';


const ModalRoom = ({ active, content, onSuccess }) => {

    return ( active &&
        <StyledModalContainer>
            <StyledModalOverlay />
            <StyledModal>
                <StyledModalContent>
                    <h4>{content}</h4>
                </StyledModalContent>
                <StyledModalActions>
                    <Button className="button" onClick={onSuccess}>Confirmar</Button>
                </StyledModalActions>
            </StyledModal>
        </StyledModalContainer>
    )
}

export default ModalRoom;
