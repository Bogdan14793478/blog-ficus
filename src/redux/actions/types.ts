import {
  GET_ALL_POST,
  CREATE_NEW_POST,
  DELETE_POST,
  SET_CURRENT_PAGE,
  POST_DELETE_ALL_INFORM,
  POST_PLUS_OR_MINUS_LIKE,
  POST_PUT,
  SAVE_IMG_POST,
  TOGLE_IS_FETCHING,
  COMMENTS_PLUS_OR_MINUS_LIKE,
  USER_IS_AUTH,
  USER_DELETE_ALL_INFORM,
  INFORM_USER,
  GET_ALL_USERS,
  SET_CURRENT_PAGE_USERS,
  USER_UPDATE_INFORM,
  DELETE_USER,
  SAVE_AVATAR_USER,
  SHOW_INFO_CHOOSE_USER,
  TOGLE_IS_FETCHING_USER,
} from "./const"

// POST
type ActionCreateNewPostsActionType = {
  type: typeof CREATE_NEW_POST
  payload: any
}
// мне нужно каждый payload расписать что в него входит и какой тип??
export const actionCreateNewPosts = (
  payload: any
): ActionCreateNewPostsActionType => ({
  type: CREATE_NEW_POST,
  payload,
})

type ActionDeletePostsActionType = {
  type: typeof DELETE_POST
  payload: any
}
export const actionDeletePosts = (payload: any): ActionDeletePostsActionType => ({
  type: DELETE_POST,
  payload,
})

type ActionGetAllPostsActionType = {
  type: typeof GET_ALL_POST
  payload: any
}
export const actionGetAllPosts = (payload: any): ActionGetAllPostsActionType => ({
  type: GET_ALL_POST,
  payload,
})

type ActionGetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE; payload: any }
export const actionGetCurrentPage = (page: any): ActionGetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  payload: page,
})

type actionPostDeleteAllInformActionType = {
  type: typeof POST_DELETE_ALL_INFORM
  payload: any
}
export const actionPostDeleteAllInform = (
  payload: any
): actionPostDeleteAllInformActionType => ({
  type: POST_DELETE_ALL_INFORM,
  payload,
})

type ActionpostPlusOrMinusLikeActionType = {
  type: typeof POST_PLUS_OR_MINUS_LIKE
  payload: any
}
export const actionpostPlusOrMinusLike = (
  payload: any
): ActionpostPlusOrMinusLikeActionType => ({
  type: POST_PLUS_OR_MINUS_LIKE,
  payload,
})

type ActionputPostFromDispatchActionTypes = {
  type: typeof POST_PUT
  payload: any
}
export const actionputPostFromDispatch = (
  payload: any
): ActionputPostFromDispatchActionTypes => ({
  type: POST_PUT,
  payload,
})

type ActionSaveImgPostActionTypes = {
  type: typeof SAVE_IMG_POST
  payload: any
}
export const actionSaveImgPost = (payload: any): ActionSaveImgPostActionTypes => ({
  type: SAVE_IMG_POST,
  payload,
})

type ActionTogleIsFetchingActionTypes = {
  type: typeof TOGLE_IS_FETCHING
  payload: any
}
export const actionTogleIsFetching = (
  payload: any
): ActionTogleIsFetchingActionTypes => ({
  type: TOGLE_IS_FETCHING,
  payload,
})

type ActionCommentPlusOrMinusLikeActionTypes = {
  type: typeof COMMENTS_PLUS_OR_MINUS_LIKE
  payload: any
}
export const actionCommentPlusOrMinusLike = (
  payload: any
): ActionCommentPlusOrMinusLikeActionTypes => ({
  type: COMMENTS_PLUS_OR_MINUS_LIKE,
  payload,
})

// USER
type UserIsAuthActionType = {
  type: typeof USER_IS_AUTH
  payload: any
}
export const userIsAuth = (payload: any): UserIsAuthActionType => ({
  type: USER_IS_AUTH,
  payload,
})

type UserDeleteAllInformActionType = {
  type: typeof USER_DELETE_ALL_INFORM
  payload: any
}
export const userDeleteAllInform = (
  payload: any
): UserDeleteAllInformActionType => ({
  type: USER_DELETE_ALL_INFORM,
  payload,
})

type ActiongetAllUsersActionType = { type: typeof GET_ALL_USERS; payload: any }
export const actiongetAllUsers = (payload: any): ActiongetAllUsersActionType => ({
  type: GET_ALL_USERS,
  payload,
})

type ActionUsersGetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE_USERS
  payload: any
}
export const actionUsersGetCurrentPage = (
  page: any
): ActionUsersGetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE_USERS,
  payload: page,
})

type ActionDeleteUserActionType = { type: typeof DELETE_USER; payload: any }
export const actionDeleteUser = (payload: any): ActionDeleteUserActionType => ({
  type: DELETE_USER,
  payload,
})

type ActionUserUpdateInformActionType = {
  type: typeof USER_UPDATE_INFORM
  payload: any
}
export const actionUserUpdateInform = (
  payload: any
): ActionUserUpdateInformActionType => ({
  type: USER_UPDATE_INFORM,
  payload,
})

type ActionShowChooseUserActionType = {
  type: typeof SHOW_INFO_CHOOSE_USER
  payload: any
}
export const actionShowChooseUser = (
  payload: any
): ActionShowChooseUserActionType => ({
  type: SHOW_INFO_CHOOSE_USER,
  payload,
})

type ActionTogleIsFetchingUserActionTypes = {
  type: typeof TOGLE_IS_FETCHING_USER
  payload: any
}
export const actionTogleIsFetchingUser = (
  payload: any
): ActionTogleIsFetchingUserActionTypes => ({
  type: TOGLE_IS_FETCHING_USER,
  payload,
})

// AUTH

type TakeInformUserActionTypes = { type: typeof INFORM_USER; payload: any }
export const takeInformUser = (payload: any): TakeInformUserActionTypes => ({
  type: INFORM_USER,
  payload,
})

type ActionSaveUserAvatarActionTypes = {
  type: typeof SAVE_AVATAR_USER
  payload: any
}
export const actionSaveUserAvatar = (
  payload: any
): ActionSaveUserAvatarActionTypes => ({
  type: SAVE_AVATAR_USER,
  payload,
})
