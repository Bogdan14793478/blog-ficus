/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable import/no-default-export */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react"
import axios from "axios"
import "./Login.css"
import { loginUrl, loginUrlGet } from "../../api/getPost"
import "materialize-css/dist/css/materialize.min.css"
// import { NavLink } from "react-router-dom"
// import { Redirect } from "react-router"

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // eslint-disable-next-line no-unused-vars
  let [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onGetUser = () => {
    axios.get(loginUrlGet, {})

  }

  const onSubmit = () => {
    if (!email && Object.keys(errors).length !== 0) {
      return
    }
    axios
      .post(loginUrl, {
        email,
        password,
      })
      .then((result) => {
        if (result.data.user) {
          onGetUser()
          console.log(result, "login")
          setUser(result.data.user)
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          localStorage.setItem("passport", result.data.access_token)
          window.location.href = "/"   //перенапрвление на страницу??
          // <Redirect to="/" />   //перенапрвление на страницу??
          // <NavLink
        }
        
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
                type="button"
                className="btn-large red"
                onClick={() => onSubmit()}
                
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
