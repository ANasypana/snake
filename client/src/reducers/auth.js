import {REGISTER_FAIL, REGISTER_SUCCESS,
    PLAYER_LOADED, AUTH_ERROR, LOGIN_FAIL,
    LOGIN_SUCCESS, LOGOUT, DELETE_ACCOUNT} from "../actions/types";

const initialState = {
    token: localStorage.getItem("tokenGC"),
    isAuthenticated: null,
    loading: true,
    player: null,
}

export const authReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch (type){
        case REGISTER_SUCCESS:{
            localStorage.setItem("tokenGC", payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false}
        }

        case LOGIN_SUCCESS:{
            localStorage.setItem("tokenGC", payload.token);
            return {...state, ...payload, isAuthenticated: true, loading: false}
        }
        case AUTH_ERROR:{
            return {...state, isAuthenticated: false, loading: false}
        }

        case LOGIN_FAIL:{
            localStorage.removeItem("tokenGC");
            return {...state, token: null, player: null, isAuthenticated: false, loading: false}
        }

        case REGISTER_FAIL:
            localStorage.removeItem("tokenGC");
            return {...state, token: null, player: null, isAuthenticated: false, loading: false}

        case PLAYER_LOADED:{
            return {...state, isAuthenticated: true, loading: false, player: payload}
        }
        case LOGOUT:{
            localStorage.removeItem("tokenGC");
            return {...state, token: null, player: null, isAuthenticated: false, loading: false}
        }
        case DELETE_ACCOUNT:{
            localStorage.removeItem("tokenGC");
            return {...state, token: null, player: null, isAuthenticated: false, loading: false}
        }
        default: return state
    }
}