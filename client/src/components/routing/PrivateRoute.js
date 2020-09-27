import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const mapStateToProps = state => ({
    auth: state.auth
})
export const PrivateRoute = connect(mapStateToProps)(({component: Component, auth: {isAuthenticated, loading}, ...rest}) => (
    <Route {...rest} render={props =>
        !loading && !isAuthenticated ? (<Redirect to="/login"/>) : (<Component {...props}/>)
    }/>
))

