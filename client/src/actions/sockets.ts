import { SOCKET_LEAVE_ROOM, SOCKET_JOIN_ROOM } from "./types";

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
    } catch (error) {
        console.log(error);
    }
};
