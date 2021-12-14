/* eslint-disable react/button-has-type */
import React from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { registerOrLogin } from "../../utils/authorization"
import { Errors } from "./Errors"
import { passworgExp } from "../../utils/helpers"
import { Labels, ErrorMsg } from "../../constantsName/constants"

type InitialValuesTypes = {
  email: string
  password: string
}
const initialValues: InitialValuesTypes = {
  email: "",
  password: "",
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(ErrorMsg.enterInformEmail)
    .required(ErrorMsg.resultRequired),
  password: Yup.string()
    .min(6, ErrorMsg.checkShortPassword)
    .max(10, ErrorMsg.checkLongPassword)
    .matches(passworgExp, ErrorMsg.mustPassword)
    .required(ErrorMsg.resultRequired),
})

export const Register = () => {
  const history = useHistory()

  function redirectToLogin() {
    history.push("/")
  }

  async function startRegistr(data: object) {
    const status = await registerOrLogin(data)
    if (status) {
      redirectToLogin()
    }
  }
  const onSubmit = (values: object, props: any) => {
    const type = { ...values, type: "register" }
    startRegistr(type, props)
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
            {({ errors, values, handleChange, isValid, dirty }) => (
              <Form>
                <div className="card-action red white-text">
                  <h3>{Labels.registerPageNameTitle}</h3>
                </div>
                <div className="card-content">
                  <div className="form-field">
                    <label htmlFor="Email Address">
                      {Labels.nameInputEmail}
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        name="email"
                        variant="outlined"
                        required
                        label="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label htmlFor="password">
                      {Labels.nameInputPassword}
                      <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={values.password}
                        variant="outlined"
                        required
                        name="password"
                        label="password"
                        autoComplete="password"
                      />
                    </label>
                  </div>
                  <div>
                    <Errors errors={errors} />
                    <div className="btn-tp">
                      <button
                        type="submit"
                        disabled={!(isValid && dirty)}
                        className="btn-large red"
                      >
                        {Labels.startRegistration}
                      </button>
                      <button className="btn-already-log" onClick={redirectToLogin}>
                        {Labels.redirectToLogin}
                      </button>
                    </div>
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
