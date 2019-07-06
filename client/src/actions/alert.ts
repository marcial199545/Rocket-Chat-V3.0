import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

export const setAlert = (msg: string, alertType: string, time = 5000) => (dispatch: any) => {
    const id = uuid.v4();
    const payload = {
        msg,
        alertType,
        id
    };
    dispatch({
        type: SET_ALERT,
        payload
    });
    setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id });
    }, time);
};
