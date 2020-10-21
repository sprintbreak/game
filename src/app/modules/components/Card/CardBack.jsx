import React from 'react'
import { CardContainer, CardWrapper } from './styled'
import dorsoCard from './../../../../assets/img/dorso-card.svg';

const CardBack = ({ scrum = false }) => {
    return (
        <CardContainer className={`card roja back ${scrum ? "scrum" : ""}`}>
            <CardWrapper className="card-back">
                <img src={dorsoCard} alt="dorso-card" />
            </CardWrapper>
        </CardContainer>
    )
}

export default CardBack;
