import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100%;
    box-sizing: border-box;
`;

export const PageHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* height: 100%; */
`;

export const ImgHome = styled.div`
    margin: 2rem;

    img {
        border-bottom: 1px solid #e72727;
        /* box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1); */
    }
`;

export const BtnHome = styled.div`

    /* .main_btn {
        position: relative;
        display: inline-block;
        background: #e72727;
        padding: 0px 40px;
        color: #fff;
        font-size: 13px;
        font-weight: 700;
        line-height: 60px;
        border: 0px;
        outline: none !important;
        box-shadow: none !important;
        text-align: center;
        cursor: pointer;
        border-radius: 0px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        z-index: 1;
        transition: all 300ms linear 0s;
        @media (max-width: 767px) {
            line-height: 50px;
        }
        &:before {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            bottom: 5px;
            right: 5px;
            background: #e72727;
            border: 1px solid #ffffff;
            z-index: -1;
            transition: all 300ms linear 0s;
        }
        &:after {
            content: '';
            position: absolute;
            bottom: 5px;
            right: 5px;
            border-right: 10px solid #ffffff;
            border-left: 10px solid transparent;
            border-bottom: 10px solid #ffffff;
            border-top: 10px solid transparent;
            transition: all 300ms linear 0s;
        }
        &:hover {
            color: #ffffff;
            background: #262533;
            &:before {
                background: #262533;
            }
            &:after {
                border-right: 10px solid #ffffff;
                border-bottom: 10px solid #ffffff;
            }
        }
    } */
`;