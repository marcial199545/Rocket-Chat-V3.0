import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const User = ({ user }: { user: any }) => {
    const { instagram, twitter, facebook, youtube, linkedin } = user.profileSettings.socials;
    const instagramLink = `https://www.instagram.com/${instagram}`;
    const twitterLink = `https://www.twitter.com/${twitter}`;
    const facebookLink = `https://www.facebook.com/${facebook.replace(/\s+/g, "")}`;
    const youtubeLink = `https://www.youtube.com/${youtube}`;
    const linkedinLink = `https://www.linkedin.com/${linkedin}`;
    return (
        <div className="user">
            <div>
                <p className="lead">
                    <img className="user__avatar" src={user && user.avatar} alt="" /> <span> {user && user.name}</span>
                </p>
                <Link to="/profile/settings">Change Profile Settings</Link>
            </div>
            {twitter && (
                <span className="social-input hide-sm">
                    <a target="_blank" rel="noopener noreferrer" href={twitterLink}>
                        <i className="fab fa-twitter fa-2x" />
                    </a>
                </span>
            )}
            {facebook && (
                <span className="social-input hide-sm">
                    <a target="_blank" rel="noopener noreferrer" href={facebookLink}>
                        <i className="fab fa-facebook fa-2x" />
                    </a>
                </span>
            )}
            {instagram && (
                <span className="social-input hide-sm">
                    <a target="_blank" rel="noopener noreferrer" href={instagramLink}>
                        <i className="fab fa-instagram fa-2x" />
                    </a>
                </span>
            )}
            {youtube && (
                <span className="social-input hide-sm">
                    <a target="_blank" rel="noopener noreferrer" href={youtubeLink}>
                        <i className="fab fa-youtube fa-2x" />
                    </a>
                </span>
            )}
            {linkedin && (
                <span className="social-input hide-sm">
                    <a target="_blank" rel="noopener noreferrer" href={linkedinLink}>
                        <i className="fab fa-linkedin fa-2x" />
                    </a>
                </span>
            )}
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
