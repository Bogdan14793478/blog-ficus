import {
  actiongetAllUsers,
  actionDeleteUser,
  actionUserUpdateInform,
  actionSaveUserAvatar,
  actionTogleIsFetchingUser,
  takeInformUser,
} from "../redux/actions/types.ts"
import { axiosInstance } from "./axios"

export function getAllUsers(skip) {
  const params = new URLSearchParams({
    skip,
  })

  const url = `users?${params.toString()}`
  return async dispatch => {
    dispatch(actionTogleIsFetchingUser(true))
    axiosInstance.get(url).then(({ data }) => {
      dispatch(actionTogleIsFetchingUser(false))
      dispatch(actiongetAllUsers(data))
    })
  }
}

export function deleteUser(userId) {
  return async dispatch => {
    axiosInstance.delete(`users/${userId}`).then(res => {
      dispatch(actionDeleteUser(res.config.data))
    })
  }
}

export function updateInformUser(data, photoFile, userId) {
  const formData = new FormData()
  formData.append("avatar", photoFile)
  return async dispatch => {
    axiosInstance.patch(`users/${userId}`, data).then(() => {
      dispatch(actionUserUpdateInform({ data }))
    })
    if (photoFile) {
      axiosInstance
        .put(`users/upload/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          dispatch(actionSaveUserAvatar({ res }))
        })
    }
  }
}

export function showInfoUser(userID) {
  return async dispatch => {
    axiosInstance
      .get(`users/${userID}`)
      .then(({ data }) => dispatch(takeInformUser(data)))
  }
}
