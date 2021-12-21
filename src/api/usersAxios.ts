import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import {
  actiongetAllUsers,
  actionDeleteUser,
  actionUserUpdateInform,
  actionSaveUserAvatar,
  actionTogleIsFetchingUser,
  takeInformUser,
  Action,
  GET_ALL_USERS,
  Users,
} from "../redux/actions/types"
import { axiosInstance } from "./axios"
import {
  PaginationGetAllPost,
  // UpdatePostRegisterArgs
} from "./posts"

interface AllGetAllUser {
  avatar: string
  dateCreated: string
  details: string
  email: string
  extra_details: string
  name: string
  profession: string
  skills: string
  __v: number
  _id: string
}
type DeleteCommitRegisterArgs = {
  skip: string
}
type GetAllPostsRegisterResponse = AxiosResponse<{
  data: AllGetAllUser[]
  pagination: PaginationGetAllPost
}>
export function getAllUsers(skip: string) {
  const params = new URLSearchParams({
    skip,
  })
  const url = `users?${params.toString()}`
  return async (dispatch: Dispatch<Action<boolean | GET_ALL_USERS>>) => {
    dispatch(actionTogleIsFetchingUser(true))
    axiosInstance
      .get<DeleteCommitRegisterArgs, GetAllPostsRegisterResponse>(url)
      .then(({ data }) => {
        dispatch(actionTogleIsFetchingUser(false))
        dispatch(actiongetAllUsers(data))
      })
  }
}

type DeleteUserRegisterArgs = {
  skip: string
}
type DeleteUserRegisterResponse = AxiosResponse<{}>
export function deleteUser(userId: string) {
  return async (dispatch: Dispatch<Action<string>>) => {
    axiosInstance
      .delete<DeleteUserRegisterArgs, DeleteUserRegisterResponse>(`users/${userId}`)
      .then(() => {
        dispatch(actionDeleteUser("by"))
      })
  }
}

interface DataUpdateUser {
  details: string
  name: string
  profession: string
  skills: string
}
type UpdatePostRegisterArgs = {
  data: DataUpdateUser
  photoFile: File
  userId: string
}
type UpdatePostRegisterResponse = AxiosResponse<{
  avatar?: string
  dateCreated?: string
  details?: string
  email?: string
  name?: string
  profession?: string
  skills?: string
  __v?: number
  _id?: string
}>
export function updateInformUser(
  data: UpdatePostRegisterArgs,
  photoFile: File,
  userId: string
) {
  const formData = new FormData()
  formData.append("avatar", photoFile)
  return async (dispatch: Dispatch<Action<any>>) => {
    // сделаю, когда главную стр буду в ТС переводить

    axiosInstance
      .patch<UpdatePostRegisterArgs, UpdatePostRegisterResponse>(
        `users/${userId}`,
        data
      )
      .then(() => {
        dispatch(actionUserUpdateInform({ data }))
      })
    if (photoFile) {
      axiosInstance
        .put<FormData, UpdatePostRegisterResponse>(
          `users/upload/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(res => {
          const { data: payload } = res
          dispatch(actionSaveUserAvatar({ res: payload }))
        })
    }
  }
}

type ShowInfoUserRegisterArgs = {
  userID: string
}
type ShowInfoUserRegisterResponse = AxiosResponse<{
  avatar?: string
  dateCreated?: string
  details?: string
  email?: string
  name?: string
  profession?: string
  skills?: string
  __v?: number
  _id?: string
}>
export function showInfoUser(userID: string) {
  return async (dispatch: Dispatch<Action<Users>>) => {
    axiosInstance
      .get<ShowInfoUserRegisterArgs, ShowInfoUserRegisterResponse>(`users/${userID}`)
      .then(({ data }) => {
        dispatch(takeInformUser(data))
      })
  }
}
