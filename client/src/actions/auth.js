import axios from "axios";
import {REGISTER_FAIL, REGISTER_SUCCESS, PLAYER_LOADED,
    AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PLAYER } from "./types";
import {setAlert} from "./alert";

import {setAuthToken} from "../utils/setAuthToken";

//Load Player
export const loadPlayer = () => async dispatch => {
    if(localStorage.tokenGC){
        setAuthToken(localStorage.getItem("tokenGC"))
    }
    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: PLAYER_LOADED,
            payload: res.data
        })
    }catch (err){
        dispatch({
            type: AUTH_ERROR
        })

    }
};

//Register Player
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post("/api/players", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadPlayer())
    }catch (err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

//Login Player
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email, password});

    try {
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadPlayer())

    }catch (err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Logout

export const logout = () => async dispatch => {
    dispatch({type: CLEAR_PLAYER})
    dispatch({type: LOGOUT});
}
