import styled from 'styled-components';

export const EyeButton = styled.span`
    background: rgba(0,0,0,.04);
    background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.06) 35%, rgba(0,0,0,0.08) 100%);
    border-radius: 100%;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.1);
    cursor: pointer;
    max-width: 80px;
    min-width: 80px;
    max-height: 80px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s ease-in-out;
    margin: 1rem;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {
        max-width: 40px;
        min-width: 40px;
        max-height: 40px;
        min-height: 40px;

        img {
            width: 25px;
        }
    }

    &.active {
        background: radial-gradient(circle, rgba(236,0,0,1) 0%, rgba(220,0,0,1) 80%, rgba(204,0,0,1) 100%);
    }

    &:active {
        transform: scale(0.9);
    }
`;