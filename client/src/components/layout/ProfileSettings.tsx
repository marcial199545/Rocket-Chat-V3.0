import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
const ProfileSettings = ({ user, loading }: { user: any; loading: any }) => {
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="user">
                <p className="lead">
                    <img className="user__avatar" src={user && user.avatar} alt="" /> <span> {user && user.name}</span>
                </p>
            </div>
        </Fragment>
    );
};

ProfileSettings.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool
};
const mapStateToProps = (state: any) => ({
    loading: state.auth.loading,
    user: state.auth.user
});

export default connect(mapStateToProps)(ProfileSettings);
