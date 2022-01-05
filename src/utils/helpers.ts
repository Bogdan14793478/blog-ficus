/* eslint-disable no-restricted-syntax */
import { toast } from "react-toastify"

export const getFromStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const setToStorage = (data: any, key: string) => {
  localStorage.setItem(key, data)
}

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key)
}

export const notifySuccess = (message: string) => {
  toast.success(message, { position: toast.POSITION.TOP_CENTER })
}
export const notifyError = (message: string) => {
  toast.error(message, { position: toast.POSITION.TOP_CENTER })
}

export const passworgExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

export const findById = (data: any, id: string | null) => {
  if (!id) {
    return false
  }

  for (const element of data) {
    if (element._id === id) {
      return element
    }
    if (element.children) {
      const desiredElement: any = findById(element.children, id)
      if (desiredElement) {
        return desiredElement
      }
    }
  }
  return false
}

// export function parseJwt(token: string | null) {
//   const base64Url = token.split(".")[1]
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(c => {
//         return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
//       })
//       .join("")
//   )
//   return JSON.parse(jsonPayload)
// }

export function parseJwt(token: string | null) {
  let jsonPayload = ""
  if (token) {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
        })
        .join("")
    )
  }

  return JSON.parse(jsonPayload)
}
