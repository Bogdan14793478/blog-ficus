import { actiongetAllUsers } from "../redux/actions/types"
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
