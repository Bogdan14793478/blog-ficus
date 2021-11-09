import axios from "axios"
import { notifyError, removeFromStorage } from "../utils/helpers"
import { checkingTokenForValidationByTime } from "../constantsName/constantsName"

const baseURL = "http://51.158.179.21/api/v1/"

export const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use((request) => {
  const newToken = localStorage.getItem("passport")
  if (newToken != null) {
    request.headers.Authorization = `Bearer ${newToken}`
    return request
  }
  return request
})

axiosInstance.interceptors.response.use(
  (resp) => {
    return resp
  },
  (error) => {
    const err = error.response.data.error
    notifyError(err)
    if (err === checkingTokenForValidationByTime) {
      removeFromStorage("passport")
    }
    return Promise.reject(error)
  }
)
