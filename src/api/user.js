import axios from "axios"
import { basePath } from "./getPost"
import { locStorageLogin, locStorageRegistr } from "../utils/helpers"

// login

const onGetUser = () => {
  axios
    .get(`${basePath}auth/user/`, {})
    .then((result) => {
      if (localStorage.getItem("passport").length > 0) {
        console.log("i am login almost")
        console.log(result, "auth/user")
      }
    })
    .catch((e) => {
      console.log(e)
    })
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
        // console.log("hi")
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
        locStorageRegistr(result)
        alert("Registration successful")
        setUser(result.data.token) // not a function
      }
    })
    .catch((e) => {
      console.log(e)
      alert("Registration not successful, try again")
    })
}
