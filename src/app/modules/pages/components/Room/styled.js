import styled from 'styled-components';

export const PageContainer = styled.div`
    min-height: 100vh;
    box-sizing: border-box;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;

    h4 {
        color: #262533;
        text-align: center;
        text-transform: uppercase;
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-top: 2rem;
    }

    .play-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const CardsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all .1s ease-in-out;

    .playing-cards {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .played-card {
        .mensaje {
            color: #262533;
            text-align: center;
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 1px;
        }
    }
`;

export const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 3rem;
    width: 100%;
`;