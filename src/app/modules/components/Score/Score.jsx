import React from 'react'
import { StyledScore } from './styled';

const Score = ({ label = 'Puntos:', score = 0 }) => {
    return (
        <StyledScore>
            <p className="score-label">{label}</p>
            <p className="score-value">{score}</p>
        </StyledScore>
    )
}

export default Score;
