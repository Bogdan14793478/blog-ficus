import { Pagination, User } from "./interface"

// eslint-disable-next-line no-shadow
export enum ActionTypesUser {
  USER_IS_AUTH = "USER_IS_AUTH",
  USER_DELETE_ALL_INFORM = "USER_DELETE_ALL_INFORM",
  GET_ALL_USERS = "GET_ALL_USERS",
  TOGLE_IS_FETCHING_USER = "TOGLE_IS_FETCHING_USER",
  SET_CURRENT_PAGE_USERS = "SET_CURRENT_PAGE_USERS",
  DELETE_USER = "DELETE_USER",
  SHOW_INFO_CHOOSE_USER = "SHOW_INFO_CHOOSE_USER",
}

// payload types
export interface GetAllUsersPayload {
  data: User[]
  pagination: Pagination
}

// action types
export type Action<T> = { type: `${ActionTypesUser}`; payload: T }
export type Action2<T, P> = { type: T; payload: P }

export type UserIsAuthType = Action2<ActionTypesUser.USER_IS_AUTH, boolean>
export const userIsAuth = (payload: boolean): UserIsAuthType => ({
  type: ActionTypesUser.USER_IS_AUTH,
  payload,
})

export type UserDelAllInfoType = Action2<ActionTypesUser.USER_DELETE_ALL_INFORM, []>
export const userDeleteAllInform = (payload: []): UserDelAllInfoType => ({
  type: ActionTypesUser.USER_DELETE_ALL_INFORM,
  payload,
})

export type GetAllUser = Action2<ActionTypesUser.GET_ALL_USERS, GetAllUsersPayload>
export const actiongetAllUsers = (payload: GetAllUsersPayload): GetAllUser => ({
  type: ActionTypesUser.GET_ALL_USERS,
  payload,
})

export type ActionTogleUser = Action2<
  ActionTypesUser.TOGLE_IS_FETCHING_USER,
  boolean
>
export const actionTogleIsFetchingUser = (payload: boolean): ActionTogleUser => ({
  type: ActionTypesUser.TOGLE_IS_FETCHING_USER,
  payload,
})

export type SetCurrentPage = Action2<ActionTypesUser.SET_CURRENT_PAGE_USERS, number>
export const actionUsersGetCurrentPage = (page: number): SetCurrentPage => ({
  type: ActionTypesUser.SET_CURRENT_PAGE_USERS,
  payload: page,
})

export type DelUserPage = Action2<ActionTypesUser.DELETE_USER, null>
export const actionDeleteUser = (): DelUserPage => ({
  type: ActionTypesUser.DELETE_USER,
  payload: null,
})

export type ShowChooseUSerPage = Action2<
  ActionTypesUser.SHOW_INFO_CHOOSE_USER,
  string
>
export const actionShowChooseUser = (payload: string): ShowChooseUSerPage => ({
  type: ActionTypesUser.SHOW_INFO_CHOOSE_USER,
  payload,
})
