import React from 'react'
import styled from 'styled-components';
import { PuffLoader } from 'react-spinners';
import elsa from './../../../../assets/img/elsa-white.svg';

const StyledLoader = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    background-color: rgba(51, 51, 51, 0.7);

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

        span a, p {
            color: #ffffff;
            font-size: 20px;
        }

        .footer {
            margin-top: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
`;

const LoaderRoom = ({ loadingRoom = false, size = 100, color = '#ec0000' }) => {
    return ( loadingRoom ? 
        (<StyledLoader>
            {/* <div className="mensaje">
                <div className="content">
                    <p>Estamos esperando que se sume más gente a la mesa para poder arrancar la partida!</p>
                    <p>Si no te gusta esperar, podés compartir este link para invitar a otras personas y así empezar a jugar.</p>
                </div>
                <div className="footer">
                    <span>
                        <a href="https://sprintbreak.github.io/game/" target="_blank">https://sprintbreak.github.io/game/</a>
                    </span>
                    <img src={elsa} alt="elsa" width={100} />
                </div>
            </div> */}
            <PuffLoader
                size={size}
                color={color}
                loading={loadingRoom}
            />
        </StyledLoader>) 
        : null
    )
}

export default LoaderRoom
