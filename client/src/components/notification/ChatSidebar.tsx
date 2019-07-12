import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadContacts } from "../../actions/contacts";
import PropTypes from "prop-types";
import uuid from "uuid";
import Spinner from "../layout/Spinner";
const ChatSidebar = ({ loadContacts, contacts }: { loadContacts: any; contacts: any }) => {
    useEffect(() => {
        loadContacts();
        // eslint-disable-next-line
    }, []);
    if (contacts === null) {
        return <Spinner />;
    }
    let friendsContacts = contacts.filter((contact: any) => {
        return contact.status === "friend";
    });
    console.log("TCL: ChatSidebar -> friendsContacts", friendsContacts);
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
                                <button className="btn btn-light contact__button">send message</button>
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
    contacts: PropTypes.array
};

const mapStateToProps = (state: any) => ({
    contacts: state.contacts.contacts
});

export default connect(
    mapStateToProps,
    { loadContacts }
)(ChatSidebar);
