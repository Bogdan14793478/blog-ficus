import { onSubmitRegister, onSubmit } from "../api/user"
import { notvalidFuncvalidFunc } from "./validators"
import { removeToStorage } from "./helpers"

export async function regPlusLogin(data) {
  let res = true
  try {
    if (data.key === "register") {
      console.log(data, " registerData")
      await removeToStorage("id")
      await onSubmitRegister(data)
      if (notvalidFuncvalidFunc) {
        res = true
      } else {
        alert("Вы не зарeгестрировались")
        res = false
      }
    } else if (data.key === "login") {
      removeToStorage("passport")
      const status = await onSubmit(data)
      if (status) {
        // (onSubmit(data) !== false)
        res = true
      } else {
        alert("Вы не вошли")
        res = false
      }
    }
  } catch (error) {
    console.log(error)
  }
  return res
}
