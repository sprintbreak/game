import styled from "styled-components";

export const Container = styled.div`

.header_area {
    color: #262533;
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;

    .status-wrapper {
        background: #262533;
        color: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        top: 0px;
        margin: 0 auto;
        height: 40px;
        line-height: 16px;

        p {
            margin: 0 1rem;
            padding: 0;
        }
    }

    .main_menu {

        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;

            @media screen 
            and (device-width: 360px) 
            and (device-height: 640px) {

                .navbar-brand {
                    margin-bottom: 1rem;
                    margin-right: 0;
                    img {
                        width: 50px;
                    }
                }

                .nickname {
                    p {
                        font-size: 11px;
                    }
                }

                .btn-salir { 
                    div {
                        font-size: 11px;
                        min-width: 0;
                    }
                }

            }

            .navbar-brand-username {
                width: 80%;
            }

            .btn-salir {
                a {
                    color: #262533;
                    text-decoration: none;
                }
                a:hover, a:active, a:focus {
                    text-decoration: none;
                }
            }

            .username {
                width: 100%;

                p {
                    font-family: 'Barlow Semi Condensed';
                    font-size: 18px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-align: center;
                    margin-bottom: 0;
                }
            }
        }
    }
}
`;