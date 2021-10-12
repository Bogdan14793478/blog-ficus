import { setToStorage } from "../utils/helpers"
import { axiosInstance } from "./axios"
// login

const onGetUser = () => {
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

export const onSubmit = ({ email, password }) => {
  console.log(email, password, "email, password")
  return axiosInstance
    .post("auth/", {
      email,
      password,
    })
    .then((result) => {
      if (result.data) {
        console.log("hi")
        setToStorage(result.data.token, "passport")
      }
    })
    .then(() => onGetUser())
    .catch((e) => {
      console.log(e)
      return false
    })
}

// Register
export const onSubmitRegister = ({ email, errors, password }) => {
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
