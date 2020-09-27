import {combineReducers} from "redux";
import {alterReduser} from "./alert"
import {authReducer} from "./auth";
import {playerReducer} from "./player";


export default combineReducers({
    alert: alterReduser,
    auth: authReducer,
    player: playerReducer,

})