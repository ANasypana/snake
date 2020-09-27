import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export const Register = connect(mapStateToProps, {setAlert, register})(props => {
    const {setAlert, register, isAuthenticated} = props;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const { name, email, password, password2 } = formData;

    const onChangeHandle = event => setFormData({...formData, [event.target.name]: event.target.value});
    const onSubmitHandle = event => {
        event.preventDefault();
        if(password !== password2){
            setAlert("Passwords do not match", "danger")
        }else {
            register({name, email, password})
        }
    }

    if(isAuthenticated){
        return <Redirect to="/startGame" />
    }

    return(
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={onSubmitHandle}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChangeHandle}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        onChange={onChangeHandle}
                        value={password2}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
});

