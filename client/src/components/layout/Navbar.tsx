import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

const Navbar = ({ isAuthenticated, loading, logout }: { isAuthenticated: any; loading: any; logout: any }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" /> <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );
    const guestlinks = (
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fab fa-rocketchat" /> RocketChat
                </Link>
            </h1>
            {!loading && <Fragment>{isAuthenticated ? authLinks : guestlinks}</Fragment>}
        </nav>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    logout: PropTypes.func
};
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);
