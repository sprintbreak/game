import React from 'react'
import styled from 'styled-components';
import Button from '../Button/Button';
import elsa from './../../../../assets/img/elsa-white.svg';
import { StyledModalContainer, StyledModalOverlay } from './styled';

const StyledContainer = styled.div`
    /* height: 100%;
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
    z-index: 20; */

    position: relative;
    width: 100%;
    z-index: 103;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {
        
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

        span a, p {
            color: #ffffff;
            font-size: 20px;
        }

        .content {
            margin-bottom: 1rem;
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


const ModalRoom = ({ active = false, content, onSuccess, onCancel = () => {}, buttonText = "Confirmar" }) => {

    return (
        active ?
        (<StyledModalContainer>
            <StyledModalOverlay />
            <StyledContainer>
                <div className="mensaje">
                    <div className="content">
                        <p>{content}</p>
                    </div>
                    <div className="footer">
                        <img src={elsa} alt="elsa" width={80} />
                        <Button className="button" onClick={onCancel}>{buttonText}</Button>
                        <Button className="button" onClick={onSuccess}>Volver a jugar</Button>
                    </div>
                </div>
            </StyledContainer>
        </StyledModalContainer>) : null
    )
}

export default ModalRoom;
