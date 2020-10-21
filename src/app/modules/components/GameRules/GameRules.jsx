import React from 'react'
import { Container, GameRulesButton } from './styled';
import icon from './../../../../assets/img/question-solid.svg';

const GameRules = ({ onClick }) => {
    return (
        <Container>
            <GameRulesButton onClick={onClick}>
                <img src={icon} alt="question" width={35} />
            </GameRulesButton>
        </Container>
    )
}

export default GameRules
