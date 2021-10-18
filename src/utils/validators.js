export const validateRegistr = (data) => {
  let res = true
  if (!data.email || Object.keys(data.errors).length !== 0) {
    res = false
  }
  return res
}
