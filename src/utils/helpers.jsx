export const setToStorage = (data, key) => {
  localStorage.setItem(key, data)
}

export const removeToStorage = (key) => {
  localStorage.removeItem(key)
}
