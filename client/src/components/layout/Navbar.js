import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";


const mapStateToProps = state => ({
    auth: state.auth,
})

export const Navbar = connect(mapStateToProps, {logout})( ({ auth: {isAuthenticated, loading}, logout}) => {

    const authLinks = (
        <ul>
            <li>
                <Link to="/ratings">
                    <i className="fas fa-signal"></i>{" "}
                    <span className="hide-sm">
                        Player rating
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/startGame">
                    <i className="fas fa-play-circle"></i>{" "}
                    <span className="hide-sm">
                        Start Game
                    </span>
                </Link>
            </li>
            <li>
                <a href="#!" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>{" "}
                    <span className="hide-sm">
                        Logout
                    </span>
                </a>
            </li>
        </ul>
    );
    const guestLinks = (
        <ul>
            <li>
                <Link to="/ratings">
                    <i className="fas fa-signal"></i>{" "}
                    <span className="hide-sm">
                        Player rating
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> GameConnector
                </Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
});
