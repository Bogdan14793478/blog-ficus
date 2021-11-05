import { useDispatch } from "react-redux"
import { setToStorage, notifySuccess } from "../utils/helpers"
import { axiosInstance } from "./axios"
import { userInformIdEmail } from "../redux/actions/types"

// login

export function getIdandEmail() {
  return async (dispatch) => {
    axiosInstance.get("auth/user/").then((res) => {
      dispatch(userInformIdEmail(res.data))
    })
  }
}

const fetchUser = () => {
  axiosInstance.get("auth/user/").then((result) => {
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
  return axiosInstance
    .post("users/", {
      email,
      password,
    })
    .then((result) => {
      setToStorage(result.data.email, "email")
      setToStorage(result.data._id, "id")
      notifySuccess("You are registered")
      return true
    })
}
