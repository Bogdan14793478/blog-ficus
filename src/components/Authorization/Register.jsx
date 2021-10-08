import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { onSubmitRegister } from "../../api/user"
import "./Login.css"
import { validateEmail } from "../../const.js/const"
import "materialize-css/dist/css/materialize.min.css"

export const Register = ({ setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState("")
  const history = useHistory()

  function handlePush() {
    history.push("/login")
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

  const goToLogin = (em, pas, er, sU) => {
    onSubmitRegister(em, er, pas, sU)
    handlePush()
  }
  return (
    <div className="row">
      <div id="allblock" className="col s12 s14 offset-14 allblock">
        <div className="card">
          <form>
            <div className="card-action red white-text">
              <h3>Register Form</h3>
            </div>
            <div className="card-content">
              <div className="form-field">
                <label htmlFor="Email Address">
                  Email
                  <input
                    type="text"
                    id="email"
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    required
                    label="Email Address"
                    onChange={handleEmailChange}
                    value={email}
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
              <div>
                <button
                  type="button"
                  className="btn-large red"
                  onClick={() => goToLogin({ email, password, errors, setUser })}
                >
                  Registration
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
