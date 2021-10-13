import { setToStorage } from "../utils/helpers"
import { axiosInstance } from "./axios"
// login

const fetchUser = () => {
  axiosInstance
    .get("auth/user/", {})
    .then((result) => {
      if (result.data) {
        console.log("i am login almost")
        console.log(result, "auth/user")
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

export const signUp = ({ email, password }) => {
  debugger
  return axiosInstance
    .post("auth/", {
      email,
      password,
    })
    .then((result) => {
      debugger
      if (result.data) {
        setToStorage(result.data.token, "passport")
      }
    })
    .then(fetchUser)
    .catch((e) => {
      console.log(e)
      return false
    })
}
// Register
export const onSubmitRegister = ({ email, password }) => {
  axiosInstance
    .post("users/", {
      email,
      password,
    })
    .then((result) => {
      if (result.data) {
        setToStorage(result.data.email, "email")
        setToStorage(result.data._id, "id")
        alert("Registration successful")
      }
    })
    .catch((e) => {
      console.log(e)
      alert("Registration not successful, try again")
    })
}
