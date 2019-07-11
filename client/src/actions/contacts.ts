// import { SET_ALERT, REMOVE_ALERT } from "./types";
import { setAlert } from "./alert";
import axios from "axios";
export const addContact = (email: string) => async (dispatch: any) => {
    try {
        //NOTE get contactInfo
        let contactInfo: any = await axios.post("/api/users/contact", { email });
        let currentUserInfo: any = await axios.get("/api/users/me");
        if (contactInfo.data.contact.email === currentUserInfo.data.email) {
            return dispatch(setAlert("can not send a request to yourself", "warning"));
        }
        await axios.post("/api/notifications/add/contact", contactInfo.data);
        let reqDataForFriendRequest = {
            requestedId: contactInfo.data.contact._id,
            requesterInfo: {
                name: currentUserInfo.data.name,
                email: currentUserInfo.data.email,
                avatar: currentUserInfo.data.avatar
            }
        };
        await axios.post("/api/notifications/add/contact/request", reqDataForFriendRequest);
        dispatch(setAlert("contact added", "success"));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};
