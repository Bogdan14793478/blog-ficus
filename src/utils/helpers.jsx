export const setToStorageLogin = (data) => {
  localStorage.setItem("passport", data)
}

export const setToStorageRegisrt = (email, id) => {
  if (email && id) {
    localStorage.setItem("email", email)
    localStorage.setItem("id", id)
  }
}
