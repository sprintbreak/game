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

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {

        .play-container {
            
            .instructions {
                h4 {
                    font-size: 18px !important;
                }
                p {
                    font-size: 11px !important;
                    width: 50%;
                    margin: 0 auto;
                    margin-top: 0 !important;
                }
            }
        }

        .score {

        }

    }

    

    .loader-round {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly; 

        h4 {
            margin-bottom: 1rem;
        }
    }

    .score {
        position: fixed;
        display: flex;
        flex-direction: column;
        bottom: 0;
        left: 0;
        margin-left: 1rem;
        padding-bottom: .5rem;
        transition: all .2s ease-in-out;
        z-index: 1;
    }

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

        .instructions {

            margin-bottom: 2rem;

            h4, p {
                color: #262533;
                text-align: center;
                letter-spacing: 1px;
            }

            h4 {
                font-size: 30px;
                margin-top: 0;
                text-transform: uppercase;
                font-weight: 700;
            }

            p {
                margin-top: 2rem;
                font-size: 18px;
                font-weight: 400;
                font-style: italic;
            }
        }
    }
`;

export const CardsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: all .1s ease-in-out;

    @media screen 
    and (device-width: 360px) 
    and (device-height: 640px) {
        
        flex-wrap: wrap;
    
    }

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
            font-style: italic;
            text-transform: uppercase;
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 1px;
        }
    }
`;

export const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 2rem;
    width: 100%;
`;