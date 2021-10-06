import React, { useState } from 'react'
import axios from 'axios';
import './Login.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/css/materialize.min.css';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)

        const clonedErrors = { ...errors };
        const isValidEmail = validateEmail(event.target.value);
        if (!isValidEmail && event.target.value.length > 0) {
            clonedErrors.email = "Email is not valid"
        } else {
            delete clonedErrors.email
        }
        setErrors(clonedErrors)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = () => {
        if (!email && Object.keys(errors).length !== 0) {
            return;
        }
        axios.post('http://51.158.179.21/api/v1/auth/', { email: email, password: password })
            .then(result => {
                console.log(result, ' result get')
            })


    }


    return (
        <div className="row">
            <div id="allblock" className="col s12 s14 offset-14 allblock">
                <div className="card">
                    <div className="card-action red white-text">
                        <h3>Login Form</h3>
                    </div>
                    <div className="card-content">
                        <div className="form-field">
                            <label htmlFor="Email Address">Email</label>
                            <input
                                type="text"
                                id="email"
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                label="Email Address"
                                autoFocus
                                value={email}
                                onChange={(event) => handleEmailChange(event)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(event) => handlePasswordChange(event)}
                                variant="outlined"
                                required
                                name="password"
                                label="Password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="form-field">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <div>
                            <button
                                className="btn-large red"
                                onClick={() => onSubmit()}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;
