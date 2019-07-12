import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadContacts } from "../../actions/contacts";
import PropTypes from "prop-types";
import uuid from "uuid";

const ChatSidebar = ({ loadContacts, contacts }: { loadContacts: any; contacts: any }) => {
    useEffect(() => {
        loadContacts();
        // eslint-disable-next-line
    }, []);
    // console.log(
    //     contacts.filter((contact: any) => {
    //         return contact.status === "pending";
    //     })
    // );
    return (
        <div className="chat__sidebar">
            <div id="add-contact-container">
                <Link to="/contact/add">Add Contact</Link>
            </div>
            {contacts.length !== 0 &&
                contacts.map((contact: any) => {
                    return (
                        <Fragment key={uuid.v4()}>
                            <div className="contact user__contact">
                                <div>
                                    <img className="user__avatar" src={contact.contactProfile.avatar} alt="" />{" "}
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
    contacts: state.contacts
});

export default connect(
    mapStateToProps,
    { loadContacts }
)(ChatSidebar);
