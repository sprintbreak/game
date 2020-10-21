import React from 'react'
import styled from 'styled-components';
import { PuffLoader } from 'react-spinners';

const StyledLoader = styled.div`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    background-color: rgba(51, 51, 51, 0.7);
`;

const Loader = ({ loading = false, size = 100, color = '#ec0000' }) => {
    return ( loading ? 
        (<StyledLoader>
            <PuffLoader 
                size={size}
                color={color}
                loading={loading}
            />
        </StyledLoader>) 
        : null
    )
}

export default Loader
