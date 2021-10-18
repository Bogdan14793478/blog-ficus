import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Form, Formik, ErrorMessage } from "formik"
import * as Yup from "yup"
import "./Login.css"
import { registerOrLogin } from "../../utils/authorization"

export const Login = () => {
  const history = useHistory()

  function redirectToHome() {
    history.push("/home")
  }

  async function onClickLogin(data) {
    const status = await registerOrLogin(data)
    if (!status) return
    if (status) {
      redirectToHome()
    }
  }

  const initialValues = {
    email: "",
    password: "",
  }

  const onSubmit = (values, props) => {
    const type = { ...values, type: "login" }
    onClickLogin(type, props)
    props.resetForm()
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  })

  return (
    <div className="row">
      <div id="allblock" className="col s12 s14 offset-14">
        <div className="card">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, values, handleChange, touched }) => (
              <Form>
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
                        value={values.email}
                        label="Email Address"
                        onChange={handleChange}
                        helpertext={<ErrorMessage name="email" />}
                        error={errors.name && touched.email}
                      />
                      {JSON.stringify(errors)}
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
                        helpertext={<ErrorMessage name="password" />}
                        error={errors.password && touched.password}
                        variant="outlined"
                        required
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                      />
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="btn-large red">
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
