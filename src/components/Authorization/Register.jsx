import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { registerOrLogin } from "../../utils/authorization"
import { validateLoginData } from "../../utils/validators"
import "materialize-css/dist/css/materialize.min.css"

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const history = useHistory()

  function redirectToLogin() {
    history.push("/login")
  }

  const afterHandleChange = (event) => {
    const clonedErrors = { ...errors }
    const isValidEmail = validateLoginData(event.target.value)
    if (!isValidEmail) {
      clonedErrors.email = "Email or password is not valid"
    } else {
      delete clonedErrors.email
    }
    setErrors(clonedErrors)
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setRegisterData({
      ...registerData,
      [name]: value,
    })
    afterHandleChange(event)
  }

  async function startRegistr(data) {
    const status = await registerOrLogin(data)
    if (!status) alert("Registration not succesful")
    if (status) {
      redirectToLogin()
    }
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
                    onChange={handleChange}
                    value={registerData.email}
                  />
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    value={registerData.password}
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
                  onClick={() =>
                    startRegistr({
                      type: "register",
                      email: registerData.email,
                      password: registerData.password,
                    })
                  }
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
