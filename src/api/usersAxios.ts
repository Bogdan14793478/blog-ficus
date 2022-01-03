import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import {
  GET_ALL_USER,
  SAVE_AVATAR_USERINT,
  StandartData,
  UpdatePostRegisterArgsInt,
  User,
  AllGetAllUser,
  PaginGetAll,
} from "../redux/actions/interface"
import {
  actionUserUpdateInform,
  actionSaveUserAvatar,
  takeInformUser,
  Action2,
  ActionTypes,
} from "../redux/actions/typeActionAuth"
import {
  actiongetAllUsers,
  ActionTypesUser,
  actionTogleIsFetchingUser,
  actionDeleteUser,
  Action,
} from "../redux/actions/typeActionUser"
import { axiosInstance } from "./axios"

type GetAllPostsRegisterResponse = AxiosResponse<{
  data: AllGetAllUser[]
  pagination: PaginGetAll
}>
export function getAllUsers(skip: string) {
  const params = new URLSearchParams({
    skip,
  })
  const url = `users?${params.toString()}`
  return async (
    dispatch: Dispatch<
      Action2<
        ActionTypesUser.TOGLE_IS_FETCHING_USER | ActionTypesUser.GET_ALL_USERS,
        boolean | GET_ALL_USER
      >
    >
  ) => {
    dispatch(actionTogleIsFetchingUser(true))
    axiosInstance.get<never, GetAllPostsRegisterResponse>(url).then(({ data }) => {
      dispatch(actionTogleIsFetchingUser(false))
      dispatch(actiongetAllUsers(data))
    })
  }
}

export function deleteUser(userId: string) {
  return async (dispatch: Dispatch<Action<string>>) => {
    axiosInstance.delete<never, never>(`users/${userId}`).then(() => {
      dispatch(actionDeleteUser("by"))
    })
  }
}

type UpdatePostRegisterResponse = AxiosResponse<User>
export function updateInformUser(
  data: StandartData,
  photoFile?: File,
  userId?: string
) {
  const formData = new FormData()
  if (photoFile) {
    formData.append("avatar", photoFile)
  }

  return async (
    dispatch: Dispatch<
      Action2<
        ActionTypes.USER_UPDATE_INFORM | ActionTypes.SAVE_AVATAR_USER,
        User | SAVE_AVATAR_USERINT
      >
    >
  ) => {
    axiosInstance
      .patch<UpdatePostRegisterArgsInt, UpdatePostRegisterResponse>(
        `users/${userId}`,
        data
      )
      .then(res => {
        dispatch(actionUserUpdateInform(res.data))
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

type ShowInfoUserRegisterResponse = AxiosResponse<User>
export function showInfoUser(userID: string) {
  return async (dispatch: Dispatch<Action2<ActionTypes.INFORM_USER, User>>) => {
    axiosInstance
      .get<never, ShowInfoUserRegisterResponse>(`users/${userID}`)
      .then(({ data }) => {
        dispatch(takeInformUser(data))
      })
  }
}
