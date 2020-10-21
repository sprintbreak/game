import React, { useState } from "react";
import { Container, ChatContainer, ChatWidgetButton } from './styled';
import elsa from './../../../../assets/img/elsa-white.svg';
import close from './../../../../assets/img/close-cross.svg';
import Button from './../Button/Button';
import Badge from '@material-ui/core/Badge';

// const mensajes = [
//     { name: 'Juanse', content: 'Hola, cómo estás?' },
//     { name: 'Gonza', content: 'Qué haces papá?' },
//     { name: 'Juanse', content: 'Bien, y vos?' },
//     { name: 'Nelson', content: 'Hola, que hacen muchachos?' },
//     { name: 'Nelson', content: 'Cómo estamos?' },
// ]


const Chat = ({ nickname, messages, sendMessage }) => {

    const [active, setActive] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [countNewMessages, setCountNewMessages] = useState(0);

    const chatRef = React.useRef(null);

    React.useEffect(() => {
        if(chatRef.current) {
            chatRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    })

    const handleActive = () => {
        if(!active) setActive(true);
        if(active) setActive(false);
    }

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    }

    const handleSendMessage = e => {
        sendMessage(newMessage);
        setNewMessage('');
    }

    return (
        <Container>
            { active && 
                (<ChatContainer>
                    <div className="chat-wrapper">

                        <div className="chat-header">
                            <img src={elsa} alt="elsa" width={50} />
                            <img className="img-close" src={close} alt="close" width={25} onClick={handleActive} />
                        </div>

                        <div className="chat-content">

                            { messages && messages.map(msg => {
                                return (
                                    <span className="msg-wrapper" key={msg.message}>
                                        <span className="msg-name">{msg.username ? msg.username : nickname}</span>
                                        <span className="msg-text">{msg.message}</span>
                                    </span>
                                )
                            })}

                            <div ref={chatRef}></div>

                        </div>

                        <div className="chat-footer">

                            <input 
                            type="text" 
                            placeholder="Escribir mensaje..." 
                            value={newMessage} 
                            onChange={handleOnChange} />

                            <Button className="chat-button" onClick={handleSendMessage}>Enviar</Button>
                        </div>
                    </div>
                </ChatContainer>) }
            <ChatWidgetButton onClick={handleActive}>
                <img src={elsa} alt="elsa-widget" width={50} />
            </ChatWidgetButton>
        </Container>
    );
}

export default Chat;