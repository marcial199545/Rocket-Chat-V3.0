import React from "react";
import ChatForm from "./ChatForm";
import Message from "./Message";
const ChatMain = () => {
    return (
        <div className="chat__main">
            <div className="chat__messages">
                <Message sent={true} />
                <Message sent={false} />
                <Message sent={true} />
                <Message sent={true} />
            </div>
            <div className="compose">
                <ChatForm />
            </div>
        </div>
    );
};

export default ChatMain;
