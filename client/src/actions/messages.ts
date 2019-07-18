import { MESSAGES_LOADED, CLEAR_MESSAGES } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const loadMessages = (contact: any) => async (dispatch: any) => {
    try {
        let currentUserInfo: any = await axios.get("/api/users/me");
        let contactInfo: any = await axios.post("/api/users/contact", { email: contact.email });
        let body = {
            currentUserProfile: currentUserInfo.data,
            contactProfile: contactInfo.data.contact,
            roomId: contact.roomId
        };
        let messagesReq = await axios.post("/api/notifications/contact/conversation", body);
        //NOTE load the messages using the roomId and set the messages state with the return value of fetching the messages
        const payload = {
            messages: messagesReq.data.messages[0].messages,
            participants: messagesReq.data.participantsCurrentUser,
            roomId: messagesReq.data.roomId
        };
        dispatch({
            type: CLEAR_MESSAGES
        });
        dispatch({
            type: MESSAGES_LOADED,
            payload
        });
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors ? error.response.data.errors : undefined;
        if (errors) {
            errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};