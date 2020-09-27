import React, {Fragment} from "react";
import {Alert} from "../layout/Alert";
import {Route, Switch} from "react-router-dom";
import {Register} from "../auth/Register";
import {Login} from "../auth/Login";
import {Rating} from "../rating/Rating";
import {PrivateRoute} from "./PrivateRoute";
import {StartGame} from "../game/StartGame";

import {NotFound} from "../layout/NotFound";

export const Routes = () => {

    return(
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/ratings" component={Rating}/>
                <PrivateRoute exact path="/startGame" component={StartGame}/>
                <Route component={NotFound}/>
            </Switch>
        </section>
    )
}