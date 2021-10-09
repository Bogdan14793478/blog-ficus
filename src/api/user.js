import axios from "axios"
import { basePath } from "./getPost"
import { locStorageLogin, locStorageRegistr } from "../utils/helpers"

// login

const onGetUser = () => {
  axios.get(`${basePath}auth/user/`, {}).then((result2) => console.log(result2))
  // при запросе пишет Unauthorized, why?? 403 error
}

export const onSubmit = ({ email, password, setUser }) => {
  axios
    .post(`${basePath}auth/`, {
      email,
      password,
    })
    .then((result) => {
      if (result.status === 200) {
        console.log("hi")
        locStorageLogin(result)
        onGetUser()
        // setUser(result.statusText) // not a function???
        if (result.data.token) {
          return true
        }
        return false
      }
      return false
    })
    .catch((e) => {
      console.log(e)
    })
}

export const rezOnSubmit = onSubmit

// Register
export const onSubmitRegister = ({ email, errors, password, setUser }) => {
  if (!email && Object.keys(errors).length !== 0) {
    return
  }
  axios
    .post(`${basePath}users/`, {
      email,
      password,
    })
    .then((result) => {
      if (result.status === 200 && result.statusText === "OK") {
        // setUser(result.config.data) не читает данные по date, почему??
        // locStorageRegistr(result)
        // does not read data from date, why??
        alert("Registration successful")
      }
      if (result.status >= 400) {
        // locStorageRegistr(result)
        alert("Registration not successful, try again")
      }
    })
    .catch((e) => {
      console.log(e)
    })
}
