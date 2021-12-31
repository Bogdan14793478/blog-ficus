import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { setToStorage, notifySuccess } from "../utils/helpers"
import { axiosInstance } from "./axios"
import { User } from "../redux/actions/interface"
import {
  Action2,
  ActionTypes,
  takeInformUser,
} from "../redux/actions/typeActionAuth"
import { Labels, InformPanel } from "../constantsName/constants"

type AuthFormData = {
  email: string
  password: string
  type: string
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

interface ResInfo {
  avatar: string
  dateCreated: string
  details: string
  email: string
  name: string
  profession: string
  skills: string
  __v: number
  _id: string
}

type GetUserInfoRegisterResponse = AxiosResponse<ResInfo>

export function getUserInfo() {
  return async (dispatch: Dispatch<Action2<ActionTypes.INFORM_USER, User>>) => {
    axiosInstance.get<never, GetUserInfoRegisterResponse>("auth/user/").then(res => {
      dispatch(takeInformUser(res.data))
    })
  }
}

// login
type FetchUserRegisterResponse = AxiosResponse<ResInfo>
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
type OnSubmitRegisterArgs = {
  email: string
  password: string
  name?: string
  avatar?: string
  extra_details?: string
  skills?: string
  profession?: string
  details?: string
}
type OnSubmitRegisterResponse = AxiosResponse<{
  _id: string
  email: string
  name: string
  avatar: string
  extra_details: string
  skills: string
  profession: string
  details: string
  dateCreated: string
}>

export const onSubmitRegister = ({ email, password }: AuthFormData) => {
  return axiosInstance
    .post<OnSubmitRegisterArgs, OnSubmitRegisterResponse>("users/", {
      email,
      password,
    })
    .then(result => {
      setToStorage(result.data.email, InformPanel.postsPageEmail)
      setToStorage(result.data._id, InformPanel.postsPageId)
      notifySuccess(InformPanel.successfulRegister)
      return true
    })
}
