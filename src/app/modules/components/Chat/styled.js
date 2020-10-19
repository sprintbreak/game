import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    bottom: 0;
    right: 0;
    margin-right: 1rem;
    margin-bottom: 1rem;
    transition: all .2s ease-in-out;
    z-index: 1;
`;

export const ChatWidgetButton = styled.span`

    background: radial-gradient(circle, rgba(236,0,0,1) 0%, rgba(220,0,0,1) 80%, rgba(204,0,0,1) 100%);
    border-radius: 100%;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.1);
    cursor: pointer;
    max-width: 80px;
    min-width: 80px;
    max-height: 80px;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    transition: all .2s ease-in-out;

    &:active {
        transform: scale(0.9);
    }
`;

export const ChatContainer = styled.div`

/* The emerging W3C standard
that is currently Firefox-only */
    * {
        scrollbar-width: thin;
        scrollbar-color: rgb(236,0,0) #ffffff;
    }

    /* Works on Chrome/Edge/Safari */
    *::-webkit-scrollbar {
        width: 12px;
    }
    *::-webkit-scrollbar-track {
        background: #ffffff;
    }
    *::-webkit-scrollbar-thumb {
        background-color: rgb(236,0,0);
        border-radius: 20px;
        border: 3px solid #ffffff;
    }

    background-color: #ffffff;
    border: 0.5px solid #dddddd;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    min-height: 450px;
    max-height: 450px;
    min-width: 300px;
    max-width: 300px;
    margin: 0 auto;
    margin-right: .5rem;
    transition: all .2s ease-in-out;

    textarea:focus,
    button:focus,
    input:focus,
    img:focus {
        outline: none;
    }

    .chat-wrapper {
        min-height: 450px;
        max-height: 450px;
        min-width:  300px;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        align-content: center;

        .chat-header {
            background-color: rgb(236,0,0);
            border-bottom: 0.5px solid #dddddd;
            width: 100%;
            min-height: 50px;
            max-height: 50px;
            display: flex;
            justify-content: space-between;

            img {
                margin: 0.5rem;
            }

            img.img-close {
                cursor: pointer;
            }
        }

        .chat-content {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            overflow-y: scroll;


            .msg-wrapper {
                border: 0.1px solid #dddddd;
                border-radius: 15px;
                background-color: rgba(200, 200, 200, 0.1);
                padding: 1rem;
                margin: 0.5rem;
                display: flex;
                flex-direction: column;
                text-align: left;
                letter-spacing: 0.5px;

                .msg-name,
                .msg-text {
                    color: #2d2d2d;
                    font-size: 12px;
                }

                .msg-name {
                    font-weight: bold;
                    margin-bottom: 5px;
                }
            }
        }

        .chat-footer {
            background-color: #2d2d2d;
            border-top: 0.5px solid #dddddd;
            margin-top: auto;
            min-height: 50px;
            max-height: 50px;
            width: 100%;
            display: flex;
            align-content: center;
            justify-content: space-evenly;
            padding: 0.5rem 0;

            input{
                border: 1px solid #ffffff;
                border-radius: 5px;
                padding: 0.5rem;
            }

            .chat-button {
                border-color: #ffffff !important;
                color: #ffffff !important;
                margin: 0;
                padding: 0;
                min-width: 100px;
                line-height: 30px;
            }
        }
    }
`;
