import { setToStorageLogin, setToStorageRegisrt } from "../utils/helpers"
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
        setToStorageLogin(result.data.token)
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
        setToStorageRegisrt(result.data.email, result.data._id)
        alert("Registration successful")
      }
    })
    .catch((e) => {
      console.log(e)
      alert("Registration not successful, try again")
    })
}
