import React from 'react'
import './Login.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/css/materialize.min.css'

const Login = () => {
    return (
        <div >
            <div className="row">
                <div className="col s12 s14 offset-14">
                    <div className="card">
                        <div className="card-action red white-text">
                            <h3>Login Form</h3>
                        </div>
                        <div className="card-content">
                            <div className="form-field">
                                <label for="email">Email</label>
                                <input type="text" id="email" />
                            </div>
                            <div className="form-field">
                                <label for="password">Password</label>
                                <input type="password" id="password" />
                            </div>
                            <div className="form-field">
                                <input type="checkbox" id="remember" />
                                <label for="remember">Remember me</label>
                            </div>
                            <div>
                                <button className="btn-large red">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;