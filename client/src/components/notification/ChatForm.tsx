import React, { useState, Fragment, ChangeEvent } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendMessage } from "../../actions/sockets";
// eslint-disable-next-line
export const socket = io("localhost:5001");
const ChatForm = ({
    currentRoom,
    participants,
    sendMessage
}: {
    currentRoom: any;
    participants: any;
    sendMessage: any;
}) => {
    const [formData, setFormData] = useState({
        message: ""
    });
    const { message } = formData;
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e: any) => {
        e.preventDefault();
        let message = e.target.elements.message.value;
        if (message.trim() !== "") {
            sendMessage(socket, { message, currentRoom, participants });
        }
        setFormData({ message: "" });
    };
    return (
        <Fragment>
            <form id="message__form" onSubmit={e => onSubmit(e)}>
                <input
                    autoComplete="false"
                    disabled={currentRoom ? false : true}
                    value={message}
                    onChange={e => onChange(e)}
                    type="text"
                    placeholder="Message"
                    name="message"
                />
                {currentRoom && (
                    <button type="submit">
                        <i className="fas fa-arrow-circle-right" />
                    </button>
                )}
            </form>
        </Fragment>
    );
};
ChatForm.propTypes = {
    currentRoom: PropTypes.string,
    participants: PropTypes.array,
    sendMessage: PropTypes.func
};

const mapStateToProps = (state: any) => ({
    currentRoom: state.sockets.currentRoom,
    participants: state.messages.participants
});

export default connect(
    mapStateToProps,
    { sendMessage }
)(ChatForm);
