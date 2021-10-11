export const locStorageLogin = (result) => {
  // console.log(result.config.data, result.data.token, "locStorage")
  localStorage.setItem("passport", result.data.token)
}

export const locStorageRegistr = (result) => {
  if (result.data) {
    localStorage.setItem("email", result.data.email)
    // localStorage.setItem("id", result.data_id)  как _id сделать легальным?
    // getId? из расчта что оно приватное??
  }
}
