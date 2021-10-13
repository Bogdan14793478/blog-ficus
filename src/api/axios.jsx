import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: "http://51.158.179.21/api/v1/",
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
