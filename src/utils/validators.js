export const validateLoginData = (e) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(e).toLowerCase())
}

export const validateRegistr = (data) => {
  let res = true
  if (!data.email || Object.keys(data.errors).length !== 0) {
    res = false
  }
  return res
}
