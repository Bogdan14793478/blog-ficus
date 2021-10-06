import React from "react";
import "./Login.css";
import "materialize-css/dist/css/materialize.min.css";

const Register = () => {
  return (
    <div>
      <div className="row">
        <div className="col s12 s14 offset-14">
          <div className="card">
            <div className="card-action red white-text">
              <h3>Registration Form</h3>
            </div>
            <div className="card-content">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="name"
                  autoFocus
                  onChange
                  err
                />
              </div>
              <div className="form-field">
                <label htmlFor="Email Address">Email</label>
                <input
                  type="text"
                  id="email"
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  autoFocus
                  onChange
                  err
                />
              </div>
              <div className="form-field">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  id="password"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                />
              </div>
              <div className="form-field">
                <label htmlFor="Password-Confiration">
                  Password-Confiration
                </label>
                <input
                  type="password"
                  id="password-confiration"
                  variant="outlined"
                  required
                  fullWidth
                  name="password-confiration"
                  label="Password-Confiration"
                  autoComplete="password-confiration"
                  Valid
                />
              </div>

              <div className="form-field">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">
                  Already have an account? Sign in
                </label>
              </div>
              <div>
                <button className="btn-large red">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
