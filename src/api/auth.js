import { setToStorage, notifySuccess } from "../utils/helpers"
import { axiosInstance } from "./axios"
import { takeInformUser } from "../redux/actions/types"
import { Labels } from "../constantsName/constants"

export function getUserInfo() {
  return async (dispatch) => {
    axiosInstance.get("auth/user/").then((res) => {
      dispatch(takeInformUser(res.data))
    })
  }
}

// login
const fetchUser = () => {
  axiosInstance.get("auth/user/").then((result) => {
    if (result.data) {
      notifySuccess(Labels.authPageTextResultSuccessfulLogin)
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
        setToStorage(result.data.token, Labels.isLoggedNameOfKeyInLocalStorage)
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
      setToStorage(result.data.email, Labels.postsPageEmail)
      setToStorage(result.data._id, Labels.postsPageId)
      notifySuccess(Labels.authPageRegisterTextRegist)
      return true
    })
}
