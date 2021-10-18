import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()
const baseURL = "http://51.158.179.21/api/v1/"

export const axiosInstance = axios.create({
  baseURL,
})

const notifyWarm = () => {
  toast.success("You are not login", { position: toast.POSITION.TOP_CENTER })
}
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
    notifyWarm()
    return Promise.reject(error)
  }
)
