import { SOCKET_LEAVE_ROOM, SOCKET_JOIN_ROOM } from "./types";
import { setAlert } from "./alert";
import axios from "axios";
import { loadMessages } from "./messages";
export const leaveRoom = (socket: any, joinedRoom: any) => async (dispatch: any) => {
    try {
        dispatch({ type: SOCKET_LEAVE_ROOM });
        await socket.emit(SOCKET_LEAVE_ROOM, joinedRoom);
    } catch (error) {
        console.log(error);
    }
};
export const joinRoom = (socket: any, roomId: any) => async (dispatch: any) => {
    try {
        dispatch({ type: SOCKET_JOIN_ROOM, payload: roomId });
        await socket.emit(SOCKET_JOIN_ROOM, roomId);
        socket.removeAllListeners();
        socket.on("ROOM_JOINED", (data: any) => {
            dispatch(setAlert(`User joined`, "success"));
        });
    } catch (error) {
        console.log(error);
    }
};

export const sendMessage = (socket: any, data: any) => async (dispatch: any) => {
    try {
        // eslint-disable-next-line
        let messageRes = await axios.post("api/notifications/message", data);
        await socket.emit("SEND_MESSAGE", data);
        // await socket.removeAllListeners();
        await socket.on("NEW_MESSAGE", (message: any) => {
            let contactModel = {
                email: data.participants[1].email,
                roomId: data.currentRoom
            };
            dispatch(loadMessages(contactModel));
        });
    } catch (error) {
        console.log(error);
    }
};
