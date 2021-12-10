/* eslint-disable no-restricted-syntax */
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

export const findById = (data, id) => {
  for (const element of data) {
    if (element._id === id) {
      return element
    }
    if (element.children) {
      const desiredElement = findById(element.children, id)
      if (desiredElement) {
        return desiredElement
      }
    }
  }
  return false
}

// from jwt-key take info about user
export function parseJwt(token) {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join("")
  )
  return JSON.parse(jsonPayload)
}
