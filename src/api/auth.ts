import { AxiosResponse } from "axios"
import { setToStorage, notifySuccess } from "../utils/helpers"
import { axiosInstance } from "./axios"
import { takeInformUser } from "../redux/actions/types"
import { Labels, InformPanel } from "../constantsName/constants"

type ValuesType = {
  email: string
  password: string
}
export type ObjectUserAuth = {
  avatar: string
  dateCreated: string
  details: string
  email: string
  __v?: number
  name: string
  profession: string
  skills: string
  _id: string
}

export function getUserInfo() {
  return async (dispatch: any) => {
    axiosInstance.get("auth/user/").then(res => {
      dispatch(takeInformUser(res.data))
    })
  }
}

// login

const fetchUser = () => {
  axiosInstance.get("auth/user/").then(result => {
    if (result.data) {
      notifySuccess(InformPanel.successfulAuth)
    }
  })
}

type SignUpArgs = { email: string; password: string }
type SignUpResponse = AxiosResponse<{ token: string }>

export const signUp = (data: ValuesType) => {
  // const { email, password } = data  узнать как правильно???
  // const newData = { email, password }
  return axiosInstance
    .post<SignUpArgs, SignUpResponse>(
      "auth/",
      //  (newData: SignUpArgs)
      {
        email: data.email,
        password: data.password,
      }
    )
    .then(result => {
      setToStorage(result.data.token, Labels.token)
    })
    .then(fetchUser)
    .then(() => {
      return true
    })
}

// Register
type OnSubmitRegisterArgs = { email: string; password: string }
type OnSubmitRegisterResponse = AxiosResponse<{ _id: string; email: string }>

export const onSubmitRegister = (data: ValuesType) => {
  return axiosInstance
    .post<OnSubmitRegisterArgs, OnSubmitRegisterResponse>("users/", {
      email: data.email,
      password: data.password,
    })
    .then(result => {
      setToStorage(result.data.email, InformPanel.postsPageEmail)
      setToStorage(result.data._id, InformPanel.postsPageId)
      notifySuccess(InformPanel.successfulRegister)
      return true
    })
}
