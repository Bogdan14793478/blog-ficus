import { isetToStorage } from "../utils/helpers"
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
  axiosInstance
    .post("auth/", {
      email,
      password,
    })
    .then((result) => {
      if (result.status === 200) {
        // console.log("hi")
        isetToStorage(result.data.token, "passport")
        onGetUser()
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
export const onSubmitRegister = ({ email, errors, password }) => {
  if (!email && Object.keys(errors).length !== 0) {
    return
  }
  axiosInstance
    .post("users/", {
      email,
      password,
    })
    .then((result) => {
      if (result.status === 200 && result.statusText === "OK") {
        isetToStorage(result.data.email, "email", result.data._id, "id")
        alert("Registration successful")
      }
    })
    .catch((e) => {
      console.log(e)
      alert("Registration not successful, try again")
    })
}
