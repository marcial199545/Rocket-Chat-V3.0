import { MESSAGES_LOADED, CLEAR_MESSAGES } from "../actions/types";
const initialState: any = {
    messages: null,
    loading: true,
    participants: null,
    roomId: null
};

export default function(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case MESSAGES_LOADED:
            return {
                ...state,
                messages: [...payload.messages],
                loading: false,
                participants: [...payload.participants],
                roomId: payload.roomId
            };
        case CLEAR_MESSAGES:
            return {
                messages: null,
                participants: null,
                roomId: null
            };
        default:
            return state;
    }
}
