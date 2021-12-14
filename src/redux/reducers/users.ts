/* eslint-disable no-case-declarations */
import {
  USER_IS_AUTH,
  USER_DELETE_ALL_INFORM,
  GET_ALL_USERS,
  SET_CURRENT_PAGE_USERS,
  DELETE_USER,
  SHOW_INFO_CHOOSE_USER,
  TOGLE_IS_FETCHING_USER,
} from "../actions/const"
import { Labels } from "../../constantsName/constants"

type ObjectUser = {
  _id: string
  email: string
  name: string
  extra_details: string
  skills: string
  profession: string
  details: string
  dateCreated: string
  avatar: string | null
  __v: number
}

export type UserType = {
  isAuth: Boolean
  users: ObjectUser[]
  skip: Number
  totalPost: Number
  currentPage: Number
  isFetching: Boolean
  findUser: ObjectUser | null
}
const user: UserType = {
  isAuth: !!localStorage.getItem(Labels.token),
  users: [],
  skip: 10,
  totalPost: 0,
  currentPage: 1,
  isFetching: false,
  findUser: null,
}
export const stateUserReduser = (state = user, action: any): UserType => {
  switch (action.type) {
    case TOGLE_IS_FETCHING_USER:
      return { ...state, isFetching: action.payload }
    case USER_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case USER_DELETE_ALL_INFORM:
      return { ...state, users: [] }
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
        users: [],
      }
    case SHOW_INFO_CHOOSE_USER:
      const userId = action.payload
      const findUser = state.users.find(item => item._id === userId)

      if (findUser) {
        return {
          ...state,
          findUser,
        }
      }
      return state

    default:
      return state
  }
}
