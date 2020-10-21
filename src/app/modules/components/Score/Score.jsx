import React from 'react'
import { StyledScore } from './styled';
import Tooltip from '@material-ui/core/Tooltip';

const titles = {
    puntos: "Cada vez que el/la scrum master elija tu carta sumas 1 punto",
    puntosAcu: "Se acumulan a través de las partidas y te sirven para competir por los premios del día",
    superpuntos: "Cuando acumulas 3 puntos ganas la partida y sumas 1 SuperPunto"
}

const Score = ({ type = "puntos" , label = 'Puntos:', score = 0 }) => {
    
    return (
        <Tooltip title={titles[type]} placement="top">
            <StyledScore>
                <p className="score-label">{label}</p>
                <p className="score-value">{score}</p>
            </StyledScore>
        </Tooltip>
    )
}

export default Score;
