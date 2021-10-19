import { toast } from "react-toastify"

export const setToStorage = (data, key) => {
  localStorage.setItem(key, data)
}

export const removeFromStorage = (key) => {
  localStorage.removeItem(key)
}

export const notifySuccess = (message) => {
  toast.success(message, { position: toast.POSITION.TOP_CENTER })
}
export const notifyError = (message) => {
  toast.error(message, { position: toast.POSITION.TOP_CENTER })
}

export const passworgExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
