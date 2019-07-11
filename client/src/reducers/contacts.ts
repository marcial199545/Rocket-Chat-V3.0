import { ADD_CONTACT } from "../actions/types";
const initialState: any = [];

export default function(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CONTACT:
            return [...state, payload];
        // case REMOVE_ALERT:
        //     return state.filter((alert: any) => alert.id !== payload);
        default:
            return state;
    }
}
