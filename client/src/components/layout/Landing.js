import React from "react";
import  {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export const Landing = connect(mapStateToProps)(props => {
    const {isAuthenticated} = props;
    if(isAuthenticated){
        return <Redirect to="/startGame" />
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Gamer Connector</h1>
                    <p className="lead">
                        Join to our community and start play
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    )
});

