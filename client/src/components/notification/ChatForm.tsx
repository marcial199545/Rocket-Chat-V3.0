import React, { useState, Fragment, ChangeEvent } from "react";

const ChatForm = () => {
    const [formData, setFormData] = useState({
        message: ""
    });
    const { message } = formData;
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e: any) => {
        e.preventDefault();
        let message = e.target.elements.message.value;
        if (message.trim() !== "") {
            console.log("send Message", message);
        }
        setFormData({ message: "" });
    };
    return (
        <Fragment>
            <form id="message__form" onSubmit={e => onSubmit(e)}>
                <input value={message} onChange={e => onChange(e)} type="text" placeholder="Message" name="message" />
                <button type="submit">
                    <i className="fas fa-arrow-circle-right" />
                </button>
            </form>
        </Fragment>
    );
};

export default ChatForm;
