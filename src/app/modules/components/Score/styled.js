import styled from 'styled-components';

export const StyledScore = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 1rem;
    margin-bottom: 1rem;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {

        margin-left: 1rem;
        margin-bottom: 1rem;

        p {
            font-size: 9px !important;
            margin: 0 !important;
        }
    }


    p {
        color: #262533;
        font-size: 18px;
        font-weight: 600;
        text-transform: uppercase;
    }

    .score-value {
        margin-left: 0.5rem;
    }
`;