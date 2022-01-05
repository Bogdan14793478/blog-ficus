/* eslint-disable react/button-has-type */
import React from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import "./Login.css"
import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from "yup"
import { registerOrLogin } from "../../utils/authorization"
import { Errors } from "./Errors"
import { passworgExp } from "../../utils/helpers"
import { Labels, ErrorMsg } from "../../constantsName/constants"
import { AuthFormData, DataType } from "../../redux/actions/interface"

const initialValues: AuthFormData = {
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

export const Register: React.FC<RouteComponentProps> = () => {
  const history = useHistory()

  function redirectToLogin() {
    history.push("/")
  }

  async function startRegistr(data: DataType) {
    const status = await registerOrLogin(data)
    if (status) {
      redirectToLogin()
    }
  }
  const onSubmit = (values: AuthFormData, props: FormikHelpers<AuthFormData>) => {
    const type: DataType = { ...values, type: "register" }
    startRegistr(type)
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
                        required
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
                        required
                        name="password"
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
