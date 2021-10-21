import React from "react"
import { useHistory } from "react-router-dom"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import "./Login.css"
import { registerOrLogin } from "../../utils/authorization"
import { Errors } from "./Errors"
import { passworgExp } from "../../utils/helpers"

const initialValues = {
  validateOnMount: true,
  email: "",
  password: "",
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Required"),
  password: Yup.string()
    .min(6, "It`s to short")
    .max(10, "It`s to lond")
    .matches(passworgExp, "password must have one Upper, lower case, number")
    .required("Required"),
})

export const Login = () => {
  const history = useHistory()

  function redirectToHome() {
    history.push("/home")
  }

  async function onClickLogin(data) {
    const status = await registerOrLogin(data)
    if (status) {
      redirectToHome()
    }
  }

  const onSubmit = (values, props) => {
    const type = { ...values, type: "login" }
    onClickLogin(type, props)
    props.resetForm()
  }

  return (
    <div className="row">
      <div id="allblock" className="col s12 s14 offset-14">
        <div className="card">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {({ errors, values, handleChange, dirty, isValid }) => (
              <Form>
                <div className="card-action red white-text">
                  <h3>Login Form</h3>
                </div>
                <div className="card-content">
                  <div className="form-field">
                    <label htmlFor="Email Address">
                      Email
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        name="email"
                        variant="outlined"
                        required
                        value={values.email}
                        label="Email"
                        onChange={handleChange}
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
                        value={values.password}
                        variant="outlined"
                        required
                        name="password"
                        label="Password"
                        autoComplete="password"
                      />
                    </label>
                  </div>
                  <div>
                    <Errors errors={errors} />
                    <button
                      type="submit"
                      disabled={!(isValid && dirty)}
                      className="btn-large red"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
