/* eslint-disable import/no-default-export */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react"
import axios from "axios"
// import { NavLink } from "react-router-dom"
import "./Login.css"
import {registerUrl} from "../../api/getPost"
import "materialize-css/dist/css/materialize.min.css"
// import LOGIN_ROUTE from '../../utils/const'

const Register = (props) => {
  //   const [user, setUser] = useState({""})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState("")

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)

    const clonedErrors = { ...errors }
    const isValidEmail = validateEmail(event.target.value)
    if (!isValidEmail && event.target.value.length > 0) {
      clonedErrors.email = "Email is not valid"
    } else {
      delete clonedErrors.email
    }
    setErrors(clonedErrors)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = () => {
    if (!email && Object.keys(errors).length !== 0) {
      return
    }
    axios
      .post(registerUrl, {
        email,
        password,
      })
      .then((result) => {
        if (result.data.user) {
          props.setUser(result.data.user)
          localStorage.setItem('password', result.data.access_token);
          // <NavLink to={LOGIN_ROUTE}></NavLink>
          // window.location.href = 'http://localhost:3000/login';
          window.location.href = '/';
        }
        if (result.error) {
          localStorage.setItem('passporrt', result.data.access_token)
      }
      })
  }

  return (
    <div className="row">
      <div id="allblock" className="col s12 s14 offset-14 allblock">
        <div className="card">
          <div className="card-action red white-text">
            <h3>Register Form</h3>
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
            
            <div>
              <button
                type="button"
                className="btn-large red"
                onClick={() => onSubmit()}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
