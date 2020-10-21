import styled from 'styled-components';

export const StyledScore = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;

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