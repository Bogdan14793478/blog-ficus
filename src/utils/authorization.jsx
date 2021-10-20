import { onSubmitRegister, signUp } from "../api/user"
import { removeFromStorage } from "./helpers"

export async function registerOrLogin(data) {
  let res = false

  if (data.type === "register") {
    removeFromStorage("id")
    res = await onSubmitRegister(data)
  } else if (data.type === "login") {
    removeFromStorage("passport")
    res = await signUp(data)
  }

  return res
}

/**
 * fucntion fetchuser() { return Promise }
 *
 * fetchuser().then().catch()
 *
 *  try
 *  const result = await fetchuser()
 *  catch(e)
 */
