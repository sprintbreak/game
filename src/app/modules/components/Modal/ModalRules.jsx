import React from 'react'
import styled from 'styled-components';
import Button from '../Button/Button';
import elsa from './../../../../assets/img/elsa-white.svg';
import { StyledModalContainer, StyledModalOverlay } from './styled';

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
    z-index: 103;

    @media screen 
    and (min-device-width: 360px) 
    and (max-device-height: 820px) {
        height: 90%;

        .mensaje {
            width: 95% !important;

            .content {
                h4 {
                    font-size: 24px !important;
                    margin-top: 0;
                }
                p {
                    font-size: 14px !important;
                }
            }
        }
    }

    .mensaje {
        background: rgb(236,0,0);
        background: radial-gradient(circle, rgba(236,0,0,1) 0%, rgba(220,0,0,1) 80%, rgba(204,0,0,1) 100%);
        border-radius: 15px;
        color: #ffffff;
        font-size: 20px;
        margin: 0 auto;
        text-align: left;
        width: 40%;
        letter-spacing: .5px;
        display: flex;
        flex-direction: column;
        margin-bottom: 3rem;
        padding: 2rem;

        /* height: 90%;
        overflow: scroll; */

        span a, p {
            color: #ffffff;
            font-size: 18px;
        }

        h4 {
            color: #ffffff;
            text-align: left;
        }

        .content {
            margin-bottom: 1rem;
            p {
                font-size: 18px;
            }
        }

        .footer {
            margin-top: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .button, .button:hover {
                border-color: #ffffff !important;
                color: #ffffff !important;
            }
        }
    }
`;

const ContentModalRules = () => (<div>
    <h4>CÓMO JUGAR</h4>
    <p>Existen dos roles dentro del juego: "Integrante del scrum" y "Scrum Master", que van rotando entre las personas que participan en todas las rondas.</p>
    <p>Cuando te toque ser "Integrante del scrum" vas a poder elegir entre tus cartas de respuesta (blancas) la que mejor encaje con la carta de consigna (roja).</p>
    <p>La persona con el rol de "Scrum Master" va a elegir una de las respuestas como ganadora.</p>
    <p>La persona que haya jugado esa carta se lleva un punto.</p>
    <p>Cuando alguien acumula 3 puntos gana la partida.</p>
    <p>Tenés 20 segundos por ronda para jugar.</p>
</div>);


const ModalRoom = ({ active = false, onSuccess, buttonText = "Confirmar" }) => {

    return (
        active ?
        (<StyledModalContainer>
            <StyledModalOverlay />
            <StyledContainer>
                <div className="mensaje">
                    <div className="content">
                        <ContentModalRules />
                    </div>
                    <div className="footer">
                        <img src={elsa} alt="elsa" width={100} />
                        <Button className="button" onClick={onSuccess}>{buttonText}</Button>
                    </div>
                </div>
            </StyledContainer>
        </StyledModalContainer>) : null
    )
}

export default ModalRoom;
