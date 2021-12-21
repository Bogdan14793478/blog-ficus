/* eslint-disable react/button-has-type */
import React from "react"
import { useHistory } from "react-router-dom"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import "./Login.css"
import { registerOrLogin } from "../../utils/authorization"
import { Errors } from "./Errors"
import { passworgExp } from "../../utils/helpers"
import { userIsAuth } from "../../redux/actions/types"
import { Labels, ErrorMsg } from "../../constantsName/constants"
import { ValuesType, DataType } from "./type"
import { useAppDispatch } from "../../hooks"

const initialValues: ValuesType = {
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

export const Login = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  function redirectToHome() {
    dispatch(userIsAuth(true))
    history.push("/posts/page/1")
  }

  function redirectToRegister() {
    history.push("/register")
  }

  async function onClickLogin(data: DataType): Promise<void> {
    const status = await registerOrLogin(data)
    if (status) {
      redirectToHome()
    }
  }

  const onSubmit = (values: ValuesType, props: any): void => {
    const type = { ...values, type: "login" }
    onClickLogin(type)
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
                  <h3>{Labels.loginPageNameTitle}</h3>
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
                        // variant="outlined"
                        required
                        value={values.email}
                        // label="email"
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
                        // variant="outlined"
                        required
                        name="password"
                        // label="password"
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
                        {Labels.loginPageBtnLogin}
                      </button>
                      <button
                        className="btn-already-log"
                        onClick={redirectToRegister}
                      >
                        {Labels.redirectToRegister}
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
