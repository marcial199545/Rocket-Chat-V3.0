import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import contacts from "./contacts";
export default combineReducers({ alert, auth, contacts });
