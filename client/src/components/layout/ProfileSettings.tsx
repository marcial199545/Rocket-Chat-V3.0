import React, { Fragment, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { updateProfileSettings } from "../../actions/profile";
const ProfileSettings = ({
    user,
    loading,
    updateProfileSettings
}: {
    user: any;
    loading: any;
    updateProfileSettings: any;
}) => {
    const [formData, setFormData] = useState({
        language: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: ""
    });
    const { language, twitter, facebook, linkedin, youtube, instagram } = formData;
    useEffect(() => {
        setFormData({
            language: loading || !user.profileSettings.language ? "" : user.profileSettings.language,
            twitter: loading || !user.profileSettings.socials ? "" : user.profileSettings.socials.twitter,
            facebook: loading || !user.profileSettings.socials ? "" : user.profileSettings.socials.facebook,
            linkedin: loading || !user.profileSettings.socials ? "" : user.profileSettings.socials.linkedin,
            youtube: loading || !user.profileSettings.socials ? "" : user.profileSettings.socials.youtube,
            instagram: loading || !user.profileSettings.socials ? "" : user.profileSettings.socials.instagram
        });
    }, [loading]);
    const [displaySocialInputs, toogleSocialInputs] = useState(false);
    const onChange = (e: ChangeEvent<any>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
        updateProfileSettings(formData);
    };
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="user">
                <p className="lead">
                    <img className="user__avatar" src={user && user.avatar} alt="" /> <span> {user && user.name}</span>
                </p>
            </div>
            <h1 className="large text-primary">Profile settings</h1>
            <p className="lead">
                <i className="fas fa-user-cog" /> Edit profile settings here
            </p>
            <form onSubmit={e => onSubmit(e)} className="form">
                <div className="form-group">
                    <select name="language" value={language} onChange={e => onChange(e)}>
                        <option value="english">English</option>
                        <option value="deutch">Deutch</option>
                        <option value="español">Español</option>
                    </select>
                    <small className="form-text">Change the language</small>
                </div>
                <div className="my-2">
                    <button
                        onClick={() => toogleSocialInputs(!displaySocialInputs)}
                        type="button"
                        className="btn btn-light"
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && (
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x" />
                            <input
                                value={twitter}
                                onChange={e => onChange(e)}
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x" />
                            <input
                                value={facebook}
                                onChange={e => onChange(e)}
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x" />
                            <input
                                value={youtube}
                                onChange={e => onChange(e)}
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x" />
                            <input
                                value={linkedin}
                                onChange={e => onChange(e)}
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x" />
                            <input
                                value={instagram}
                                onChange={e => onChange(e)}
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                            />
                        </div>
                    </Fragment>
                )}
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

ProfileSettings.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    updateProfileSettings: PropTypes.func
};
const mapStateToProps = (state: any) => ({
    loading: state.auth.loading,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { updateProfileSettings }
)(ProfileSettings);
