import { CONTACTS_LOADED, CLEAR_CONTACTS } from "../actions/types";
const initialState: any = {
    contacts: null
};

export default function(state = initialState, action: any) {
    const { type, payload } = action;
    switch (type) {
        case CONTACTS_LOADED:
            return {
                ...state,
                contacts: [...payload]
            };
        case CLEAR_CONTACTS:
            return {
                contacts: null
            };
        // case REMOVE_ALERT:
        //     return state.filter((alert: any) => alert.id !== payload);
        default:
            return state;
    }
}
