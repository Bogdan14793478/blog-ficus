import { USER_IS_AUTH, USER_DELETE_ALL_INFORM, INFORM_USER } from "../actions/const"
import { Labels } from "../../constantsName/constants"

const user = {
  informUser: "",
  isAuth: !!localStorage.getItem(Labels.token),
  id: "",
}
export const stateUserReduser = (state = user, action) => {
  switch (action.type) {
    case USER_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case USER_DELETE_ALL_INFORM:
      return { ...state, informUser: "", id: "" }
    case INFORM_USER:
      return {
        ...state,
        informUser: action.payload.email,
        id: action.payload._id,
      }
    default:
      return state
  }
}
