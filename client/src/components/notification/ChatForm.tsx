import React, { useState, Fragment, ChangeEvent, FormEvent } from "react";

const ChatForm = () => {
    const [formData, setFormData] = useState({
        message: ""
    });
    const { message } = formData;
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("send Message");
    };
    return (
        <Fragment>
            <form onSubmit={e => onSubmit(e)}>
                <input value={message} onChange={e => onChange(e)} type="text" placeholder="Message" name="message" />
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </form>
        </Fragment>
    );
};

export default ChatForm;
