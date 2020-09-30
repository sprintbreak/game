import styled from 'styled-components';

export const TimerWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const TimeWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 30px;

    & div.time {
        font-size: 40px;
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