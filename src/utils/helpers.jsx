export const locStorageLogin = (result) => {
  console.log(result.config.data, result.data.token, "locStorage")
  sessionStorage.setItem("user", JSON.stringify(result.config.data))
  localStorage.setItem("passport", result.data.token)
}

export const locStorageRegistr = ({ result }) => {
  // if (result.data) {
  // localStorage.setItem("email", result.data.email)
  // localStorage.setItem("id", result.data.id)
  // } else alert("Email must be uniq")
}
