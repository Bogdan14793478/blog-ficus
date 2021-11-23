import {
  USER_IS_AUTH,
  USER_DELETE_ALL_INFORM,
  INFORM_USER,
  GET_ALL_USERS,
  SET_CURRENT_PAGE_USERS,
  DELETE_USER,
  USER_UPDATE_INFORM,
  SAVE_AVATAR_USER,
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
  name: "",
  skills: "",
  profession: "",
  details: "",
  avatar: "",
}
export const stateUserReduser = (state = user, action) => {
  console.log(action.payload, "action.payload")
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
        name: action.payload.name,
        skills: action.payload.skills,
        profession: action.payload.profession,
        details: action.payload.details,
        avatar: action.payload.avatar,
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
    case USER_UPDATE_INFORM:
      return {
        ...state,
        name: action.payload.data.name,
        skills: action.payload.data.skills,
        profession: action.payload.data.profession,
        details: action.payload.data.details,
      }
    case SAVE_AVATAR_USER:
      return {
        ...state,
        avatar: action.payload.res.data.avatar,
      }

    default:
      return state
  }
}
