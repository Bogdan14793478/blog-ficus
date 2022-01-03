import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { setToStorage, notifySuccess } from "../utils/helpers"
import { axiosInstance } from "./axios"
import { User, AuthFormData, onSubmitRegistr } from "../redux/actions/interface"
import {
  Action2,
  ActionTypes,
  takeInformUser,
} from "../redux/actions/typeActionAuth"
import { Labels, InformPanel } from "../constantsName/constants"

type GetUserInfoRegisterResponse = AxiosResponse<User>

export function getUserInfo() {
  return async (dispatch: Dispatch<Action2<ActionTypes.INFORM_USER, User>>) => {
    axiosInstance.get<never, GetUserInfoRegisterResponse>("auth/user/").then(res => {
      dispatch(takeInformUser(res.data))
    })
  }
}

// login
type FetchUserRegisterResponse = AxiosResponse<User>
const fetchUser = () => {
  axiosInstance.get<never, FetchUserRegisterResponse>("auth/user/").then(() => {
    notifySuccess(InformPanel.successfulAuth)
  })
}

type SignUpArgs = { email: string; password: string }
type SignUpResponse = AxiosResponse<{ token: string }>

export const signUp = (data: AuthFormData) => {
  return axiosInstance
    .post<SignUpArgs, SignUpResponse>("auth/", {
      email: data.email,
      password: data.password,
    })
    .then(result => {
      setToStorage(result.data.token, Labels.token)
    })
    .then(fetchUser)
    .then(() => {
      return true
    })
}

// Register

export const onSubmitRegister = ({ email, password }: AuthFormData) => {
  return axiosInstance
    .post<onSubmitRegistr, onSubmitRegistr>("users/", {
      email,
      password,
    })
    .then(result => {
      setToStorage(result.data?.email, InformPanel.postsPageEmail)
      setToStorage(result.data?._id, InformPanel.postsPageId)
      notifySuccess(InformPanel.successfulRegister)
      return true
    })
}
