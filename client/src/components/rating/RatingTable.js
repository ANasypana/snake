import React from "react";
import classNames from "classnames";

export const RatingTable = ({players, authId}) => {
    const gamesters = players.map(player =>
        (<tr
            className={classNames({"text-primary": authId === player._id})}
            key={player._id}>
            <td>{player.name.toUpperCase()}</td>
            <td className="hide-sm">{player.level}</td>
            <td className="hide-sm">{player.scores}</td>
            <td className="hide-sm">{player._id}</td>
        </tr>));

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th className="hide-sm">
                        Current Level
                    </th>
                    <th className="hide-sm">
                        Scores
                    </th>
                    <th className="hide-sm">
                        ID
                    </th>
                </tr>
            </thead>
            <tbody>
                {gamesters}
            </tbody>
        </table>
    )
}