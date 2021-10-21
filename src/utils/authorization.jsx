/* eslint-disable no-return-await */
import { onSubmitRegister, signUp } from "../api/user"
import { removeFromStorage } from "./helpers"

export async function registerOrLogin(data) {
  if (data.type === "register") {
    removeFromStorage("id")
    return await onSubmitRegister(data)
  }

  removeFromStorage("passport")
  return await signUp(data)
}
