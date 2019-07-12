import React, { useEffect, Fragment } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { handleFriendRequest, loadContacts, clearContacts } from "../../actions/contacts";
import { Link } from "react-router-dom";
const FriendRequests = ({
    contacts,
    loadContacts,
    clearContacts,
    handleFriendRequest
}: {
    contacts: any;
    loadContacts: any;
    clearContacts: any;
    handleFriendRequest: any;
}) => {
    useEffect(() => {
        clearContacts();
        loadContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts === null) {
        return <Spinner />;
    }

    const friendRequest = contacts.filter((contact: any) => {
        return contact.status === "requested";
    });
    const handleClick = (e: any, contact: any) => {
        const { email } = contact;
        if (e.target.name === "rejected") {
            // TODO Reject friend request
            handleFriendRequest("rejected", email);
        } else {
            // TODO accept friend request
            handleFriendRequest("accepted", email);
        }
    };
    return (
        <Fragment>
            {friendRequest.length === 0 ? (
                <div className="jumbotron jumbotron-fluid m-3">
                    <h1 className="display-1">
                        No friend request <i className="fas fa-frown" />
                    </h1>
                    <p className="lead">Sorry but you dont have any friend request</p>
                    <span>
                        <Link to="/dashboard">Go Home</Link>
                    </span>
                </div>
            ) : (
                friendRequest.map((contact: any) => {
                    return (
                        <div className="container container__friendRequest">
                            <Fragment key={uuid.v4()}>
                                <div className="contact user__contact__friend user__contact__friend__request">
                                    <div>
                                        <img className="contact__avatar" src={contact.contactProfile.avatar} alt="" />{" "}
                                        <p> {contact.contactProfile.name}</p>
                                        <p> {contact.contactProfile.email}</p>
                                    </div>
                                    <div id="requests__buttons">
                                        <button
                                            onClick={e => handleClick(e, { email: contact.contactProfile.email })}
                                            name="accept"
                                            className="btn btn-light contact__button"
                                        >
                                            accept
                                        </button>
                                        <button
                                            onClick={e => handleClick(e, { email: contact.contactProfile.email })}
                                            className="btn btn-light contact__button contact__button__danger"
                                            name="rejected"
                                        >
                                            reject
                                        </button>
                                    </div>
                                </div>
                            </Fragment>
                            <Link to="/dashboard">Go Home</Link>
                        </div>
                    );
                })
            )}
        </Fragment>
    );
};
FriendRequests.propTypes = {
    contacts: PropTypes.array,
    loadContacts: PropTypes.func,
    clearContacts: PropTypes.func,
    handleFriendRequest: PropTypes.func
};

const mapStateToProps = (state: any) => ({
    contacts: state.contacts.contacts
});

export default connect(
    mapStateToProps,
    { loadContacts, clearContacts, handleFriendRequest }
)(FriendRequests);
