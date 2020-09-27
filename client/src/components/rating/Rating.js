import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";

import {Spinner} from "../layout/Spinner";
import {RatingTable} from "./RatingTable";
import {getPlayers, getMorePlayers} from "../../actions/player";

const mapStateToProps = state => ({
    player: state.player,
    auth: state.auth

});

export const Rating = connect(mapStateToProps, {getPlayers, getMorePlayers})(
    ({player: {players, loading, total, pagination: {prev, next}},
         auth:{player},
         getPlayers, getMorePlayers}) => {

        useEffect(() => {
           getPlayers();
        }, [getMorePlayers]);

        const authId = player === null ? 0 : player._id;

        return (
            <Fragment>
                {
                    loading ? <Spinner/> :
                        <Fragment>
                            <h1 className="large text-primary">Player rating</h1>
                            <RatingTable players={players} authId={authId}/>

                            {total > players.length &&
                            <button
                                onClick={() => getMorePlayers(next.page)}
                                className="btn btn-primary">Loading More</button>}

                        </Fragment>
                }
            </Fragment>
        )
})