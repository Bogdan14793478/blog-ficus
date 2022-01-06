/* eslint-disable no-case-declarations */
import { ActionTypesUser } from "../actions/typeActionUser"
import { Labels } from "../../constantsName/constants"
import { User } from "../actions/interface"

export type Initial = {
  isAuth: boolean
  users: User[]
  skip: number
  totalPost: number
  currentPage: number
  isFetching: boolean
  findUser: User | null
}
const user: Initial = {
  isAuth: !!localStorage.getItem(Labels.token),
  users: [],
  skip: 10,
  totalPost: 0,
  currentPage: 1,
  isFetching: false,
  findUser: null,
}
export const stateUserReduser = (state = user, action: any): Initial => {
  switch (action.type) {
    case ActionTypesUser.TOGLE_IS_FETCHING_USER:
      return { ...state, isFetching: action.payload }
    case ActionTypesUser.USER_IS_AUTH:
      return { ...state, isAuth: action.payload }
    case ActionTypesUser.USER_DELETE_ALL_INFORM:
      return { ...state, users: [] }
    case ActionTypesUser.GET_ALL_USERS:
      return {
        ...state,
        users: [...action.payload.data],
        skip: state.skip,
        totalPost: Math.ceil(action.payload.pagination.total / 10),
      }
    case ActionTypesUser.SET_CURRENT_PAGE_USERS:
      return {
        ...state,
        currentPage: action.payload,
      }
    case ActionTypesUser.DELETE_USER:
      return {
        ...state,
        isAuth: false,
        users: [],
      }
    case ActionTypesUser.SHOW_INFO_CHOOSE_USER:
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
