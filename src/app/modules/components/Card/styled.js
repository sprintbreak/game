import styled, { keyframes } from 'styled-components';

const shadow = keyframes`
  to {
    box-shadow: 0 0 0 10px rgba(236,0,0,.04), 0 0 0 20px rgba(236,0,0,.03), 0 0 0 30px rgba(236,0,0,.02);
    /* transform:  scale(1.05); */
  }
`;

const winShadow = keyframes`
  to {
    box-shadow: 0 0 0 10px rgba(46, 204, 113,.07), 0 0 0 20px rgba(46, 204, 113,.05), 0 0 0 30px rgba(46, 204, 113,.06);
    /* transform:  scale(1.05); */
  }
`;

/*
    min-width: 180px;
    max-width: 180px;
    min-height: 250px;
    max-height: 250px;
 */

export const CardContainer = styled.div`
    border: 0.5px solid #D1D1D1;
    border-radius: 15px;
    box-shadow: none;  
    min-width: 180px;
    max-width: 180px;
    min-height: 250px;
    max-height: 250px;
    margin: 1rem;
    transition: all 0.2s ease;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {
        min-width: 90px;
        max-width: 90px;
        min-height: 125px;
        max-height: 125px;

        &, &.blanca, &.back, &.scrum {
            margin: .25rem !important;
        }

        &.blanca, &.back {
            margin-top: 2.5rem !important;
        }

        &.scrum {
            margin-top: .25rem !important;
        }
    }

    &.default {
        background: rgba(0,0,0,.04);
        background: radial-gradient(circle, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.06) 35%, rgba(0,0,0,0.08) 100%);
        border: 1px dashed rgba(0,0,0,0.5);
    }
    
    &.blanca {
        background: rgb(255,255,255);
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 35%, rgba(245,245,245,1) 100%);
        color: black;

        &:hover {
            border: 0.5px solid rgb(236,0,0);
            cursor: pointer;
        }

        &.checked {
            border: 0.5px solid rgb(236,0,0);
            /* transform: scale(1.1); */
            /* box-shadow: 0 0 0 40px rgba(255,255,255,.04), 0 0 0 80px rgba(255,255,255,.03), 0 0 0 120px rgba(255,255,255,.02); */
            animation: .5s ${shadow} forwards infinite alternate;
        }
    }

    &.win {
        border: 0.5px solid #2ecc71 !important;
        animation: .5s ${winShadow} forwards infinite alternate !important;
    }


    &.roja {
        background: rgb(236,0,0);
        background: radial-gradient(circle, rgba(236,0,0,1) 0%, rgba(220,0,0,1) 80%, rgba(204,0,0,1) 100%);
        color: #ffffff;
    }

    &.blanca, &.back {
        margin-top: 2.5rem;
    }

    &.scrum {
        margin: 1rem;
    }
`;

export const CardWrapper = styled.div`
    min-width: 180px;
    max-width: 180px;
    min-height: 250px;
    max-height: 250px;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {
        min-width: 90px;
        max-width: 90px;
        min-height: 125px;
        max-height: 125px;
        padding: 1rem;
    }

    &.card-back {
        padding: 0;
        img {
            width: 100%; 
            height: 100%; 
            object-fit: contain; 
        }
    }
`;

export const CardContent = styled.div`
    p {
        text-align: left;
        font-size: 18px;
        font-weight: 400;
    }

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {
        p {
            font-size: 9px;
        }
    }
`;

export const CardFooter = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {
        img {
            width: 25px;
        }
    }
`;