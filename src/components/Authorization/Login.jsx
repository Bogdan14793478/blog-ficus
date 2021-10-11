import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import "materialize-css/dist/css/materialize.min.css"
import { onSubmit, onSubmit as rezOnSubmit } from "../../api/user"

export const Login = ({ setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })
  const history = useHistory()

  function handlePush() {
    history.push("/")
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  async function onClickLogin(loginData) {
    try {
      onSubmit(loginData)
      await (rezOnSubmit ? handlePush() : alert("Вы не вошли"))
    } catch (err) {
      console.error(err)
    }
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
                    value={email}
                    label="Email Address"
                    onChange={handleEmailChange}
                  />
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    id="password"
                    onChange={handlePasswordChange}
                    value={password}
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
                  onClick={() => onClickLogin({ email, password, setUser })}
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
