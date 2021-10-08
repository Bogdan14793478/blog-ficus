import axios from "axios"
import { basePath } from "./getPost"
import { locStorageLogin, locStorageRegistr } from "../utils/helpers"

// login

const onGetUser = () => {
  axios.get(`${basePath}auth/user/`, {})
}

export const onSubmit = ({ email, password, setUser, errors }) => {
  axios
    .post(`${basePath}auth/`, {
      email,
      password,
    })
    .then((result) => {
      if (result.data.user) {
        setUser(result.data.user)
        locStorageLogin(result)
        onGetUser()
      }
    })
  return true
}

export const rezOnSubmit = onSubmit

// export const onSubmit = (ourParam) => {
//   console.log(ourParam.email, "1234")
//   if (!ourParam.email && Object.keys(ourParam.errors).length !== 0) {
//     return
//   }
//   axios
//     .post(`${basePath}auth/`, {
//       email: ourParam.email,
//       password: ourParam.password,
//     })
//     .then((result) => {
//       if (result.data.user) {
//         ourParam.setUser(result.data.user)
//         locStorageLogin(result)
//         onGetUser()
//       }
//     })
// }

// Register
export const onSubmitRegister = ({ email, errors, password, setUser }) => {
  if (!email && Object.keys(errors).length !== 0) {
    return
  }
  axios
    .post(`${basePath}users/`, {
      email,
      password,
    })
    .then((result) => {
      if (result.data.user) {
        setUser(result.data.user)
        locStorageRegistr(result)
      }
      if (result.error) {
        locStorageRegistr(result)
      }
    })
}
