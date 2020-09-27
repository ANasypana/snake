import {
    PLAYERS_ERROR,
    GET_PLAYERS,
    GET_MORE_PLAYERS

} from "../actions/types";

const initialState = {
    players: [],
    total: 0,
    pagination: {},
    loading: true,
    error: {}
}

export const playerReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch (type){
        case GET_PLAYERS: {
            return {...state, players: payload.data, total: payload.count, pagination: payload.pagination,
                loading: false, error: {}}
        }
        case GET_MORE_PLAYERS:{
            return {...state, players: [...state.players, ...payload.data], total: payload.count,
                pagination: payload.pagination, loading: false, error: {}}
        }
        case PLAYERS_ERROR:{
            return {...state, error: payload, loading: false}
        }
        default: return state
    }
}