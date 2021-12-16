import {
  actiongetAllUsers,
  actionDeleteUser,
  actionUserUpdateInform,
  actionSaveUserAvatar,
  actionTogleIsFetchingUser,
  takeInformUser,
} from "../redux/actions/types"
import { axiosInstance } from "./axios"

export function getAllUsers(skip: string) {
  const params = new URLSearchParams({
    skip,
  })
  const url = `users?${params.toString()}`
  return async (dispatch: any) => {
    dispatch(actionTogleIsFetchingUser(true))
    axiosInstance.get(url).then(({ data }) => {
      dispatch(actionTogleIsFetchingUser(false))
      dispatch(actiongetAllUsers(data))
    })
  }
}

export function deleteUser(userId: string) {
  return async (dispatch: any) => {
    axiosInstance.delete(`users/${userId}`).then(() => {
      dispatch(actionDeleteUser("by"))
    })
  }
}

interface UserInform {
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
// interface ResUpdateUser {
//   config: any
//   data: UserInform
//   headers: any
//   request: any
//   status: number
//   statusText: string
// }
interface DataUpdateUser {
  details: string
  name: string
  profession: string
  skills: string
}
// type UpdatePostRegisterArgs = {
//   description: string
//   fullText: string
//   title: string
// }
// type UpdatePostRegisterResponse = AxiosResponse<{ res: Photo }>
export function updateInformUser(
  data: DataUpdateUser,
  photoFile: string,
  userId: string
) {
  const formData = new FormData()
  formData.append("avatar", photoFile)
  return async (dispatch: any) => {
    axiosInstance.patch(`users/${userId}`, data).then(() => {
      dispatch(actionUserUpdateInform({ data }))
    })
    if (photoFile) {
      axiosInstance
        .put<any, UserInform>(`users/upload/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res: UserInform) => {
          dispatch(actionSaveUserAvatar({ res }))
        })
    }
  }
}

export function showInfoUser(userID: string) {
  return async (dispatch: any) => {
    axiosInstance
      .get(`users/${userID}`)
      .then(({ data }) => dispatch(takeInformUser(data)))
  }
}
