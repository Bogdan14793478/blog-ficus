import axios from "axios"

const baseURL = "http://51.158.179.21/api/v1/"

export const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(
  (request) => {
    const newToken = localStorage.getItem("passport")
    if (newToken != null) {
      request.headers.Authorization = `Bearer ${newToken}`
      return request
    }
    return request
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
