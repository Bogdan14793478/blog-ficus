import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { User, Pagination, UpdateUser } from "../redux/actions/interface"
import {
  actionUserUpdateInform,
  actionSaveUserAvatar,
  takeInformUser,
  Action2,
  ActionTypes,
  UserAvatarPayload,
} from "../redux/actions/typeActionAuth"
import {
  actiongetAllUsers,
  ActionTypesUser,
  actionTogleIsFetchingUser,
  actionDeleteUser,
  GetAllUsersPayload,
} from "../redux/actions/typeActionUser"
import { axiosInstance } from "./axios"

type GetAllPostsRegisterResponse = AxiosResponse<{
  data: User[]
  pagination: Pagination
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
        boolean | GetAllUsersPayload
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
  return async (dispatch: Dispatch<Action2<ActionTypesUser.DELETE_USER, null>>) => {
    axiosInstance.delete<never, never>(`users/${userId}`).then(() => {
      dispatch(actionDeleteUser())
    })
  }
}

export function updateInformUser(
  data: UpdateUser,
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
        User | UserAvatarPayload
      >
    >
  ) => {
    axiosInstance
      .patch<UpdateUser, AxiosResponse<User>>(`users/${userId}`, data)
      .then(res => {
        dispatch(actionUserUpdateInform(res.data))
      })
    if (photoFile) {
      axiosInstance
        .put<FormData, AxiosResponse<User>>(`users/upload/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          const { data: payload } = res
          dispatch(actionSaveUserAvatar({ res: payload }))
        })
    }
  }
}

export function showInfoUser(userID: string) {
  return async (dispatch: Dispatch<Action2<ActionTypes.INFORM_USER, User>>) => {
    axiosInstance
      .get<never, AxiosResponse<User>>(`users/${userID}`)
      .then(({ data }) => {
        dispatch(takeInformUser(data))
      })
  }
}
