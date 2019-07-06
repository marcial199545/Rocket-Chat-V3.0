import React from "react";
// eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
// import PropTypes from 'prop-types'

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Rocket Chat</h1>
                    <p className="lead">Chat application using react as a framework</p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Landing.propTypes = {

// }

export default Landing;
