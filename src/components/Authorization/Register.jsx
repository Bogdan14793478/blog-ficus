import React from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { registerOrLogin } from "../../utils/authorization"
import { Errors } from "./Errors"
import { passworgExp } from "../../utils/helpers"

const initialValues = {
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

export const Register = () => {
  const history = useHistory()

  function redirectToLogin() {
    history.push("/login")
  }

  async function startRegistr(data) {
    const status = await registerOrLogin(data)
    if (status) {
      redirectToLogin()
    }
  }
  const onSubmit = (values, props) => {
    const type = { ...values, type: "register" }
    startRegistr(type, props)
    props.resetForm()
  }

  return (
    <div className="row">
      <div id="allblock" className="col s12 s14 offset-14 allblock">
        <div className="card">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {({ errors, values, handleChange, isValid, dirty }) => (
              <Form>
                <div className="card-action red white-text">
                  <h3>Register Form</h3>
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
                        label="Email"
                        value={values.email}
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
                      Registration
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
