import React, { Fragment, useState } from "react";
// eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
// import PropTypes from 'prop-types'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;
    const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log("submited");
        // login(email, password);
    };
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Sign Into Your Account
                </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            value={email}
                            onChange={e => onChange(e)}
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            value={password}
                            onChange={e => onChange(e)}
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength={6}
                            required
                        />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Create One</Link>
                </p>
            </section>
        </Fragment>
    );
};

// Login.propTypes = {

// }

export default Login;
