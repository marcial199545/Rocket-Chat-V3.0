import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { loadMessages } from "../../actions/messages";
import { joinRoom, leaveRoom } from "../../actions/sockets";
import { Link } from "react-router-dom";
import { loadContacts } from "../../actions/contacts";
import PropTypes from "prop-types";
import uuid from "uuid";
import { socket } from "./ChatForm";
import Spinner from "../layout/Spinner";

const ChatSidebar = ({
    loadContacts,
    loadMessages,
    joinRoom,
    leaveRoom,
    currentRoom,
    contacts
}: {
    loadContacts: any;
    loadMessages: any;
    joinRoom: any;
    leaveRoom: any;
    currentRoom: any;
    contacts: any;
}) => {
    useEffect(() => {
        loadContacts();
        // eslint-disable-next-line
    }, []);
    if (contacts === null) {
        return <Spinner />;
    }
    const handleClick = (e: any, contact: any) => {
        e.preventDefault();
        loadMessages(contact);
        if (currentRoom === null) {
            joinRoom(socket, contact.roomId);
        } else {
            leaveRoom(socket, currentRoom);
            joinRoom(socket, contact.roomId);
        }
    };
    let friendsContacts = contacts.filter((contact: any) => {
        return contact.status === "friend";
    });
    return (
        <div className="chat__sidebar">
            <div id="add-contact-container">
                <Link to="/contact/add">Add Contact</Link>
            </div>
            {friendsContacts.map((contact: any) => {
                return (
                    <Fragment key={uuid.v4()}>
                        <div className="contact user__contact__friend">
                            <div>
                                <img className="contact__avatar" src={contact.contactProfile.avatar} alt="" />{" "}
                                <span> {contact.contactProfile.name}</span>
                            </div>
                            <div>
                                <button
                                    onClick={e => handleClick(e, contact.contactProfile)}
                                    className="btn btn-light contact__button"
                                >
                                    send message
                                </button>
                            </div>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
};
ChatSidebar.propTypes = {
    loadContacts: PropTypes.func,
    loadMessages: PropTypes.func,
    joinRoom: PropTypes.func,
    leaveRoom: PropTypes.func,
    contacts: PropTypes.array
};

const mapStateToProps = (state: any) => ({
    contacts: state.contacts.contacts,
    currentRoom: state.sockets.currentRoom
});

export default connect(
    mapStateToProps,
    { loadContacts, loadMessages, joinRoom, leaveRoom }
)(ChatSidebar);
