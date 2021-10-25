const user = {
  informUser: {},
}
export const stateUserReduser = (state = user, action) => {
  switch (action.type) {
    case "USER_SIGN_IN":
      return { ...state, informUser: { ...action.payload } }
    case "USER_SIGN_OUT":
      return state
    default:
      return state
  }
}
// export default statePostReduser
