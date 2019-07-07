import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_PROFILE,
    LOGOUT
} from "./types";
import { setAlert } from "./alert";

// NOTE Register User
export const registerUser = ({ name, email, password }: { name: string; email: string; password: string }) => async (
    dispatch: any
) => {
    const config: any = {
        "Content-Type": "application/json"
    };
    const body = { name, email, password };
    try {
        await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({ type: REGISTER_FAIL });
        dispatch(loadUser());
    }
};
// NOTE Login User
export const login = (email: string, password: string) => async (dispatch: any) => {
    const config: any = {
        "Content-Type": "application/json"
    };
    const body = { email, password };
    try {
        await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({ type: LOGIN_FAIL });
        dispatch(loadUser());
    }
};
// NOTE Logout User
export const logout = () => (dispatch: any) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
//NOTE Load User
export const loadUser = () => async (dispatch: any) => {
    try {
        const res = await axios.get("/api/auth");
        console.log("TCL: loadUser -> res", res.data);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};
