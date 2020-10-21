import styled from 'styled-components';

export const TimerWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {

        margin-bottom: 1rem !important;

        /* & div:first-child {
            width: 40px !important;
            height: 40px !important;

            svg {
                width: 40px !important;
                height: 40px !important;
            }
        } */
    }
`;

export const TimeWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 30px;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {

        width: 25px;
        height: 15px;
        
        & div.time {
            font-size: 15px !important;
        }
    }

    & div.time {
        font-size: 30px;
        font-family: 'Barlow Semi Condensed';
        font-weight: 700;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(0);
        opacity: 1;
        transition: all 0.3s;
    }

    & div.time.up {
        opacity: 0;
        transform: translateY(-100%);
    }

    & div.time.down {
        opacity: 0;
        transform: translateY(100%);
    }
`;