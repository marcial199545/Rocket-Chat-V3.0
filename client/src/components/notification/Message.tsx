import React from "react";
const Message = (props: any) => {
    return (
        <div className={props.sent ? "message__sent" : "message__received"}>
            <div>
                <span className="message__user">Some User Name</span>
                <span className="message__meta">11:00 am</span>
                <p>some message, get this sdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdf value from the db</p>
            </div>
        </div>
    );
};

export default Message;
