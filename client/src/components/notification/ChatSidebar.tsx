import React from "react";
import { Link } from "react-router-dom";
import Contact from "../users/Contact";
const ChatSidebar = () => {
    return (
        <div className="chat__sidebar">
            <div id="add-contact-container">
                <Link to="/contact/add">Add Contact</Link>
            </div>
            <Contact />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
            <Contact />
        </div>
    );
};

export default ChatSidebar;
