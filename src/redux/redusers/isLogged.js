import { USER_IS_AUTH, USER_DELETE_ALL_INFORM } from "../actions/const"

const user = {
  informUser: {},
  isAuth: !!localStorage.getItem("passport"),
}
export const stateUserReduser = (state = user, action) => {
  switch (action.type) {
    case USER_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case USER_DELETE_ALL_INFORM:
      return { ...state, informUser: {} }
    // case "USER_SIGN_IN":
    //   return { ...state, informUser: { ...action.payload } }
    // case "USER_SIGN_OUT":
    //   return state
    default:
      return state
  }
}
// export default statePostReduser
