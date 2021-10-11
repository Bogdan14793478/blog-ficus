import axios from "axios"
import { basePath as baseURL } from "./getPost"

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

    // localStorage.setItem("passport", config.data.token)

    // взять токен
    // добавить в хеадерс
    // учесть момент если токена нет
    // получить токен и сделать проверку если его нет
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
