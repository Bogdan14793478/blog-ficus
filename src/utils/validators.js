export const validateEmail = (e) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(e).toLowerCase())
}

export const notvalidFuncvalidFunc = (data) => {
  console.log(data.email, " loginData.email")
  let res = true
  if (!data.email || Object.keys(data.errors).length !== 0) {
    res = false
  }
  console.log(res, " res2")
  return res
}
