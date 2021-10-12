/* eslint-disable no-unreachable */
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { regPlusLogin } from "../../utils/authorization"

import "materialize-css/dist/css/materialize.min.css"
import { onSubmit, onSubmit as rezOnSubmit } from "../../api/user"

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })
  const history = useHistory()

  function handlePush() {
    history.push("/home")
  }

  const handleLoginFormChange = (event) => {
    const { value, name } = event.target

    setLoginData({
      ...loginData,
      [name]: value, // [изменяемый ключ]: значение
    })
  }

  async function startLogin(data) {
    const status = await regPlusLogin(data)
    if (status) handlePush()
  }

  return (
    <div className="row">
      <div id="allblock" className="col s12 s14 offset-14">
        <div className="card">
          <form>
            <div className="card-action red white-text">
              <h3>Login Form</h3>
            </div>
            <div className="card-content">
              <div className="form-field">
                <label htmlFor="email-address">
                  Email
                  <input
                    type="text"
                    id="email-address"
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    required
                    value={loginData.email}
                    label="Email Address"
                    onChange={handleLoginFormChange}
                  />
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    id="password"
                    onChange={handleLoginFormChange}
                    value={loginData.password}
                    variant="outlined"
                    required
                    name="password"
                    label="Password"
                    autoComplete="current-password"
                  />
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" />
                  Remember me
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-large red"
                  // onClick={onClickLogin}
                  onClick={() =>
                    startLogin({
                      key: "login",
                      email: loginData.email,
                      password: loginData.password,
                    })
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
