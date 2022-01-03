/* eslint-disable no-return-await */
import { onSubmitRegister, signUp } from "../api/auth"
import { removeFromStorage } from "./helpers"
import { DataType, SubmitFormType } from "../redux/actions/interface"

export async function registerOrLogin(data: DataType): Promise<boolean> {
  if (data.type === SubmitFormType.SignUp) {
    removeFromStorage("id")
    return await onSubmitRegister(data)
  }
  removeFromStorage("passport")
  return await signUp(data)
}
