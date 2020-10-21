import styled from 'styled-components';

export const StyledModalContainer = styled.div`
    top: 0px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: 101;
`;

export const StyledModal = styled.div`
    background-color: rgb(255,255,255);
    box-shadow: 0px 0px 30px 3px rgba(88, 88, 88, 0.3);
    border-radius: 10px;
    color: rgba(0,0,0,0.87);
    display: flex;
    flex-direction: column;
    min-height: 130px;
    max-height: 100%;
    min-width: 240px;
    max-width: 50%;
    position: relative;
    overflow: auto;
    transition: all .4s cubic-bezier(.25,.8,.25,1);
    width: 100%;
    z-index: 103;
    border: 3px solid rgb(236,0,0);
`;

export const StyledModalContent = styled.div`
    margin-bottom: 0;
    margin-top: 10px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    order: 1;
    flex-direction: column;

    h4, p {
        padding-top: 1rem;
    }

    .MuiTextField-root {
        width: 90%;
        margin: 1rem auto;
    }
`;

export const StyledModalActions = styled.div`
    align-items: center;
    flex-direction: row;
    box-sizing: border-box;
    display: flex;
    min-height: 40px;
    overflow: hidden;
    justify-content: flex-end;
    margin-bottom: 0;
    order: 2;
    padding: 0 30px;
    padding-top: 20px;
    padding-bottom: 20px;

    & div.button {
        margin: 0.5rem;
    }

`;

export const StyledModalOverlay = styled.div`
    height: 100%;
    transition-duration: 0.3s;
    background-color: #000;
    opacity: 0.48;
    z-index: 102;
    transition: opacity .45s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;