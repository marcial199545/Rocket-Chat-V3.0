import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import contacts from "./contacts";
import messages from "./messages";
import sockets from "./sockets";
export default combineReducers({ alert, auth, contacts, messages, sockets });
