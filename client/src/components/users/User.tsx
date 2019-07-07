import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const User = ({ user }: { user: any }) => {
    return (
        <div className="user">
            <p className="lead">
                <img className="user__avatar" src={user && user.avatar} alt="" /> <span> {user && user.name}</span>
            </p>
        </div>
    );
};

User.propTypes = {
    user: PropTypes.object
};
const mapStateToProps = (state: any) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(User);
