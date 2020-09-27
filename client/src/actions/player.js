import axios from "axios";
import {setAlert} from "./alert";

import {
    PLAYERS_ERROR, GET_MORE_PLAYERS,
    DELETE_ACCOUNT, GET_PLAYERS, CLEAR_PLAYER, PLAYER_LOADED} from "./types";

//Get players
export const getPlayers = (page=1, limit=10) => async dispatch => {
    try {
        const res = await axios.get(`/api/players?page=${page}&limit=${limit}`);

        dispatch({
            type: GET_PLAYERS,
            payload: res.data
        })

    }catch (err){
        dispatch({
            type: PLAYERS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
};

//Get  more players
export const getMorePlayers = (page, limit=10) => async dispatch => {
    try {
        const res = await axios.get(`/api/players?page=${page}&limit=${limit}`);
        dispatch({
            type: GET_MORE_PLAYERS,
            payload: res.data
        })

    }catch (err){
        dispatch({
            type: PLAYERS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
};


//Update Player
export const updatePlayer = (data) => async dispatch =>{
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.put("/api/players", data, config);
        console.log(res.data)
        dispatch({
            type: PLAYER_LOADED,
            payload: res.data
        });
        dispatch(setAlert("Your results were updated", "success"));

    }catch (err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        }
        dispatch({
            type: PLAYERS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        })
    }
};

//Delete Account

export const deleteAccount = () => async dispatch => {
    if(window.confirm("Are you sure? This can NOT be undone")){
        try {
            await axios.delete("api/players");
            dispatch({type: CLEAR_PLAYER});
            dispatch({type: DELETE_ACCOUNT});
            dispatch(setAlert("Your account has been permanently deleted"));

        }catch (err){
            dispatch({
                type: PLAYERS_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status
                }
            })
        }
    }
}