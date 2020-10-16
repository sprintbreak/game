import React, { useState } from "react";
import { addResponseMessage, addUserMessage, Widget } from 'react-chat-widget';
import { ChatContainer } from './styled';
import elsa from './../../../../assets/img/elsa-white.svg';

import 'react-chat-widget/lib/styles.css';

const Chat = ({ messages, sendMessage  }) => {

    const [newMessage, setNewMessage] = useState('');
    const [contentMessages, setContentMessages] = useState('');

    React.useEffect(() => {
        addResponseMessage(messages);
    }, [messages])

    return (
        <ChatContainer>
            <Widget 
            title="SprintBreak Chat"
            handleNewUserMessage={sendMessage}
            subtitle={false} />
        </ChatContainer>
    );
}

export default Chat;