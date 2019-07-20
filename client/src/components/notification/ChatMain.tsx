import React, { useEffect } from "react";
import ChatForm from "./ChatForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserBadge from "../users/UserBadge";
import Message from "./Message";
import { autoScroll } from "../../helpers";

const ChatMain = ({
    messages,
    participants,
    roomId,
    loading
}: {
    messages?: any;
    participants?: any;
    roomId?: string;
    loading?: boolean;
}) => {
    useEffect(() => {
        autoScroll();
    }, []);
    if (messages === null || loading === true) {
        return (
            <div className="chat__main">
                <div className="chat__messages">
                    <div className="badge">
                        <h1 className="display display-info">No messages</h1>
                    </div>
                </div>
                <div className="compose">
                    <ChatForm />
                </div>
            </div>
        );
    } else if (messages !== null && messages.length === 0) {
        const contact = participants[1];
        console.log("TCL: contact", contact);
        return (
            <div className="chat__main">
                <UserBadge userName={contact.name} gravatar={contact.avatar} />
                <div className="chat__messages">
                    <div className="badge">
                        <h1 className="display display-info">No messages</h1>
                    </div>
                </div>
                <div className="compose">
                    <ChatForm />
                </div>
            </div>
        );
    }
    const contact = participants[1];
    return (
        <div className="chat__main">
            <UserBadge userName={contact.name} gravatar={contact.avatar} />
            <div className="chat__messages">
                {messages.map((message: any) => {
                    return (
                        <Message
                            key={message._id}
                            sent={message.sent}
                            sender={message.sender}
                            date={message.date}
                            msg={message.msg}
                        />
                    );
                })}
            </div>
            <div className="compose">
                <ChatForm />
            </div>
        </div>
    );
};
ChatMain.propTypes = {
    messages: PropTypes.array,
    participants: PropTypes.array,
    roomId: PropTypes.string,
    loading: PropTypes.bool
};

const mapStateToProps = (state: any) => ({
    messages: state.messages.messages,
    participants: state.messages.participants,
    roomId: state.messages.roomId,
    loading: state.messages.loading
});

export default connect(mapStateToProps)(ChatMain);
