import { toast } from "react-toastify"
import { setToStorage, notifySuccess, notifyError } from "../utils/helpers"
import { axiosInstance } from "./axios"

// login

const fetchUser = () => {
  axiosInstance.get("auth/user/", {}).then((result) => {
    if (result.data) {
      notifySuccess("You a authorizated")
    }
  })
}

export const signUp = ({ email, password }) => {
  return axiosInstance
    .post("auth/", {
      email,
      password,
    })
    .then((result) => {
      if (result.data) {
        setToStorage(result.data.token, "passport")
      }
    })
    .then(fetchUser)
    .then(() => {
      return true
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
        notifySuccess("You are registered")
      }
    })
    .catch((e) => {
      const err = e.response.data.error
      notifyError(err)
    })
}
