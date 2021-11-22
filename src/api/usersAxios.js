import { actiongetAllUsers, actionGetInfotmUser } from "../redux/actions/types"
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

export function getUsersInform(id) {
  return async (dispatch) => {
    axiosInstance.get(`users/${id}`).then((res) => {
      dispatch(actionGetInfotmUser(res.data))
    })
  }
}
