import React, { Fragment, useState, FormEvent, ChangeEvent } from "react";
// eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const { name, email, password, password2 } = formData;
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Passwords do not match", "danger", 2000);
            console.log("passwords dont match");
        } else {
            console.log("submitted");
            // register({ name, email, password });
        }
    };
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Create Your Account
                </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            value={name}
                            onChange={e => onChange(e)}
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            value={email}
                            onChange={e => onChange(e)}
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            required
                        />
                        <small className="form-text">
                            This site uses Gravatar so if you want a profile image, use a Gravatar email
                        </small>
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
                    <div className="form-group">
                        <input
                            value={password2}
                            onChange={e => onChange(e)}
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength={6}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">sign In</Link>
                </p>
            </section>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
};
// const mapStateToProps = (state:any) => ({

// })

export default connect(
    null,
    { setAlert }
)(Register);
