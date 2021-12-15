/* eslint-disable no-return-await */
import { onSubmitRegister, signUp } from "../api/auth"
import { removeFromStorage } from "./helpers"
import { DataType } from "../components/Authorization/type"

export async function registerOrLogin(data: DataType): Promise<boolean> {
  if (data.type === "register") {
    removeFromStorage("id")
    return await onSubmitRegister(data)
  }
  removeFromStorage("passport")
  return await signUp(data)
}
