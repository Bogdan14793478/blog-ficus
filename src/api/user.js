import { toast } from "react-toastify"
import { setToStorage } from "../utils/helpers"
import { axiosInstance } from "./axios"
import "react-toastify/dist/ReactToastify.css"

toast.configure()
// login

const fetchUser = () => {
  const notifySuccess = () => {
    toast.success("You a authorizated", { position: toast.POSITION.TOP_CENTER })
  }

  axiosInstance
    .get("auth/user/", {})
    .then((result) => {
      if (result.data) {
        notifySuccess()
      }
    })
    .catch((e) => {
      console.log(e)
    })
}

export const signUp = ({ email, password }) => {
  const notifyWarm = () => {
    toast.success("You are not login", { position: toast.POSITION.TOP_CENTER })
  }
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
    .catch((e) => {
      console.log(e)
      notifyWarm()
      return false
    })
}
// Register
export const onSubmitRegister = ({ email, password }) => {
  const notifyRegSuccess = () => {
    toast.success("You are registered", { position: toast.POSITION.TOP_CENTER })
  }

  const notifyRegErr = () => {
    toast.error("You are not registered", { position: toast.POSITION.TOP_CENTER })
  }
  axiosInstance
    .post("users/", {
      email,
      password,
    })
    .then((result) => {
      if (result.data) {
        setToStorage(result.data.email, "email")
        setToStorage(result.data._id, "id")
        // alert("Registration successful")
        notifyRegSuccess()
      }
    })
    .catch((e) => {
      console.log(e)
      // alert("Registration not successful, try again")
      notifyRegErr()
    })
}
