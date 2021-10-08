export const locStorageLogin = ({ result }) => {
  sessionStorage.setItem("user", JSON.stringify(result.data.user))
  localStorage.setItem("passport", result.data.access_token)
}

export const locStorageRegistr = ({ result }) => {
  localStorage.setItem("password", result.data.access_token)
}
