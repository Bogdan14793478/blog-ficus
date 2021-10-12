import { onSubmitRegister, onSubmit } from "../api/user"
import { notvalidFuncvalidFunc } from "./validators"

export async function regPlusLogin(data) {
  let res = true
  try {
    if (data.key === "register") {
      console.log(data, " registerData")
      await localStorage.removeItem("id")
      await onSubmitRegister(data)
      if (notvalidFuncvalidFunc) {
        res = true
      } else {
        alert("Вы не зарeгестрировались")
        res = false
      }
    } else if (data.key === "login") {
      localStorage.removeItem("passport")
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
  console.log(res, "res auth")
  return res
}
