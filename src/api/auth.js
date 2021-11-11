/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
// import { useDispatch } from "react-redux"
// import { Link } from "react-router-dom"
import { setToStorage, notifySuccess } from "../utils/helpers"
import { axiosInstance } from "./axios"
import {
  takeInformUser,
  // getAllPostFailure
} from "../redux/actions/types"
// import { getAllPosts } from "./posts"
import history from "../components/history"

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
