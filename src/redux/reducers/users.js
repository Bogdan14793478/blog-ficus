import {
  USER_IS_AUTH,
  USER_DELETE_ALL_INFORM,
  INFORM_USER,
  GET_ALL_USERS,
  SET_CURRENT_PAGE_USERS,
  GET_INFORM_USER,
  DELETE_USER,
} from "../actions/const"
import { Labels } from "../../constantsName/constants"

const user = {
  informUser: "",
  isAuth: !!localStorage.getItem(Labels.token),
  id: "",
  users: [],
  skip: 10,
  totalPost: 0,
  currentPage: 1,
  dateCreated: "",
  skills: "",
  profession: "",
  details: "",
}
export const stateUserReduser = (state = user, action) => {
  switch (action.type) {
    case USER_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case USER_DELETE_ALL_INFORM:
      return { ...state, informUser: "", id: "", users: "" }
    case INFORM_USER:
      return {
        ...state,
        informUser: action.payload.email,
        id: action.payload._id,
        dateCreated: action.payload.dateCreated,
      }
    case GET_ALL_USERS:
      return {
        ...state,
        users: [...action.payload.data],
        skip: state.skip,
        totalPost: Math.ceil(action.payload.pagination.total / 10),
      }
    case SET_CURRENT_PAGE_USERS:
      return {
        ...state,
        currentPage: action.payload,
      }
    case DELETE_USER:
      return {
        ...state,
        isAuth: false,
        id: "",
        users: [],
        informUser: "",
      }
    default:
      return state
  }
}
