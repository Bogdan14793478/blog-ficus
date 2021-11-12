/* eslint-disable react/button-has-type */
import React from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import "./Login.css"
import { registerOrLogin } from "../../utils/authorization"
import { Errors } from "./Errors"
import { passworgExp } from "../../utils/helpers"
import { userIsAuth } from "../../redux/actions/types"
import { Labels } from "../../constantsName/constants"

const initialValues = {
  validateOnMount: true,
  email: "",
  password: "",
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(Labels.loginRegisterPageYupEmailValid)
    .required(Labels.formCreatePageYupRequired),
  password: Yup.string()
    .min(6, Labels.loginRegPageSchemaPasswordShort)
    .max(10, Labels.loginRegPageSchemaPasswordLong)
    .matches(passworgExp, Labels.loginRegPageSchemaOrderPassword)
    .required(Labels.formCreatePageYupRequired),
})

export const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.user.isAuth)

  const history = useHistory()

  function redirectToHome() {
    dispatch(userIsAuth(true))
    history.push(Labels.homePageRedirectToPagePosts)
  }

  function readyRegister() {
    history.push(Labels.loginPageRedirectToRegisterPage)
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
                  <h3>{Labels.loginPageNameTitle}</h3>
                </div>
                <div className="card-content">
                  <div className="form-field">
                    <label htmlFor="Email Address">
                      {Labels.loginPageEmail}
                      <input
                        type={Labels.loginRegisterPageEmail}
                        id={Labels.loginRegisterPageEmail}
                        autoComplete={Labels.loginRegisterPageEmail}
                        name={Labels.loginRegisterPageEmail}
                        variant={Labels.loginRegistrPageVariantInput}
                        required
                        value={values.email}
                        label={Labels.loginRegisterPageEmail}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="form-field">
                    <label htmlFor={Labels.loginRegisterPasswordPage}>
                      {Labels.loginPagePassword}
                      <input
                        type={Labels.loginRegisterPasswordPage}
                        id={Labels.loginRegisterPasswordPage}
                        onChange={handleChange}
                        value={values.password}
                        variant={Labels.loginRegistrPageVariantInput}
                        required
                        name={Labels.loginRegisterPasswordPage}
                        label={Labels.loginRegisterPasswordPage}
                        autoComplete={Labels.loginRegisterPasswordPage}
                      />
                    </label>
                  </div>
                  <div>
                    <Errors errors={errors} />
                    <div className="btn-tp">
                      <button
                        type={Labels.loginRegisterPageSubmitType}
                        disabled={!(isValid && dirty)}
                        className="btn-large red"
                      >
                        {Labels.loginPageBtnLogin}
                      </button>
                      <button className="btn-already-log" onClick={readyRegister}>
                        {Labels.loginPageBtnNeedToRegister}
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
