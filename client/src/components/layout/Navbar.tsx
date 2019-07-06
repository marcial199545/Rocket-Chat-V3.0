import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fab fa-rocketchat" /> RocketChat
                </Link>
            </h1>
            {/* {!loading && <Fragment>{isAuthenticated ? authLinks : guestlinks}</Fragment>} */}
            <ul>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

// Navbar.propTypes = {

// }

export default Navbar;
