// import { CONTACTS_LOADED, CLEAR_CONTACTS, GROUPS_LOADED, EMPTY_GROUPS } from "./types";
import { setAlert } from "./alert";
import axios from "axios";
export const addGroupConversation = (socket: any, { email, groupName }: { email: string; groupName: string }) => async (
    dispatch: any
): Promise<void> => {
    try {
        let contactInfo: any = await axios.post("/api/users/contact", { email });
        let currentUserInfo: any = await axios.get("/api/users/me");
        if (contactInfo.data.contact.email === currentUserInfo.data.email) {
            return dispatch(setAlert("you can not add yourself in the conversation", "warning"));
        }
        console.log(currentUserInfo.data);
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
        }
    }
};
