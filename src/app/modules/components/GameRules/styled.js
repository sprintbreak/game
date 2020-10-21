import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    bottom: 0;
    right: 0;
    margin-right: 1rem;
    margin-bottom: 1rem;
    transition: all .2s ease-in-out;
    z-index: 1;
`;

export const GameRulesButton = styled.span`

    background: radial-gradient(circle, rgba(236,0,0,1) 0%, rgba(220,0,0,1) 80%, rgba(204,0,0,1) 100%);
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
    margin: auto 1rem 1rem 0;
    transition: all .2s ease-in-out;

    &:active {
        transform: scale(0.9);
    }
`;