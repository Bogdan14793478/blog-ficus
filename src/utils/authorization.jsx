import { onSubmitRegister, signUp } from "../api/user"
import { validateRegistr } from "./validators"
import { removeToStorage } from "./helpers"

export async function registerOrLogin(data) {
  let res = true
  try {
    if (data.type === "register") {
      await removeToStorage("id")
      await onSubmitRegister(data)
      const validData = await validateRegistr(data)
      if (!validData) {
        alert("Вы не зарeгестрировались")
        res = false
      }
      if (validData) {
        res = true
      }
    } else if (data.type === "login") {
      removeToStorage("passport")
      const status = await signUp(data)
      if (!status) {
        res = false
      }
      if (status) {
        res = true
      }
    }
  } catch (error) {
    console.log(error)
  }
  return res
}
