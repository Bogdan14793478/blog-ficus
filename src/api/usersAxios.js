import {
  actiongetAllUsers,
  actionDeleteUser,
  actionUserUpdateInform,
  actionSaveUserAvatar,
} from "../redux/actions/types"
import { axiosInstance } from "./axios"

export function getAllUsers(skip) {
  const params = new URLSearchParams({
    skip,
  })

  const url = `users?${params.toString()}`
  return async (dispatch) => {
    axiosInstance.get(url).then((res) => {
      dispatch(actiongetAllUsers(res.data))
    })
  }
}

export function deleteUser(userId) {
  return async (dispatch) => {
    axiosInstance.delete(`users/${userId}`).then((res) => {
      dispatch(actionDeleteUser(res.config.data))
    })
  }
}

export function deletePost(postId) {
  axiosInstance.delete(`posts/${postId}`)
}

export function updateInformUser(data, photoFile, userId) {
  const formData = new FormData()
  formData.append("avatar", photoFile)
  return async (dispatch) => {
    await axiosInstance.patch(`users/${userId}`, data).then((res) => {
      dispatch(actionUserUpdateInform({ data }))
    })
    if (photoFile) {
      axiosInstance
        .put(`users/upload/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(actionSaveUserAvatar({ res }))
        })
    }
  }
}
