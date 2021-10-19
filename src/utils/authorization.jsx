import { onSubmitRegister, signUp } from "../api/user"
import { removeFromStorage } from "./helpers"

export async function registerOrLogin(data) {
  let res = true
  try {
    if (data.type === "register") {
      await removeFromStorage("id")
      res = await onSubmitRegister(data)
    } else if (data.type === "login") {
      removeFromStorage("passport")
      res = await signUp(data)
    }
  } catch (error) {
    console.log(error)
  }
  return res
}
