import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../actions/auth";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export const Login = connect(mapStateToProps, {login})(({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
    email: "",
    password: "",
    });
    const { email, password } = formData;

    const onChangeHandle = event => setFormData({...formData, [event.target.name]: event.target.value});
    const onSubmitHandle = event => {
        event.preventDefault();
        login({email, password})
    }

    if(isAuthenticated){
        return <Redirect to="/startGame" />
    }

    return(
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={onSubmitHandle}>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChangeHandle}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        onChange={onChangeHandle}
                        value={password}
                        required
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don`t have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
});

