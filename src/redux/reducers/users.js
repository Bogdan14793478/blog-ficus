/* eslint-disable no-case-declarations */
import {
  USER_IS_AUTH,
  USER_DELETE_ALL_INFORM,
  GET_ALL_USERS,
  SET_CURRENT_PAGE_USERS,
  DELETE_USER,
  USER_UPDATE_INFORM,
  SAVE_AVATAR_USER,
  SHOW_INFO_CHOOSE_USER,
  TOGLE_IS_FETCHING_USER,
} from "../actions/const"
import { Labels } from "../../constantsName/constants"

const user = {
  isAuth: !!localStorage.getItem(Labels.token),
  users: [],
  skip: 10,
  totalPost: 0,
  currentPage: 1,
  isFetching: false,
  findUser: {},
}
export const stateUserReduser = (state = user, action) => {
  switch (action.type) {
    case TOGLE_IS_FETCHING_USER:
      return { ...state, isFetching: action.payload }
    case USER_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case USER_DELETE_ALL_INFORM:
      return { ...state, informUser: "", id: "", users: "" }
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
    case SHOW_INFO_CHOOSE_USER:
      const userId = action.payload
      const findUser = state.users.find((item) => item._id === userId)
      return {
        ...state,
        findUser,
      }
    default:
      return state
  }
}
