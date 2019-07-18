import React from "react";
import ChatForm from "./ChatForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserBadge from "../users/UserBadge";
import Message from "./Message";
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
    // console.log(messages);
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
        // console.log("TCL: contact", contact);
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
    return (
        <div className="chat__main">
            <div className="chat__messages">
                <Message sent={true} />
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
