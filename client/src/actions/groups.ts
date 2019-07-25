// import { CONTACTS_LOADED, CLEAR_CONTACTS, GROUPS_LOADED, EMPTY_GROUPS } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const addGroupConversation = (socket: any, data: any, history: any) => async (dispatch: any): Promise<void> => {
    try {
        let { participants, groupName } = data;
        if (participants.length === 0) {
            return dispatch(setAlert("Add at least one participant", "warning"));
        }
        let currentUserInfo: any = await axios.get("/api/users/me");
        if (
            !participants.find((participant: any) => {
                return participant.email === currentUserInfo.data.email;
            })
        ) {
            participants.unshift(currentUserInfo.data);
        }
        await axios.post("/api/notifications/group/conversation", { participants, groupName });
        // history.push("/dashboard");
        // dispatch({
        //     type: "type",
        //     payload: "payload"
        // });
    } catch (error) {
        console.log(error);
    }
};
