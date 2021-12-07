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
  SHOW_INFO_FIND_USER,
  SHOW_ALL_COMMENTS_FOR_POST,
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
export const actionCreateNewPosts = (payload) => ({ type: CREATE_NEW_POST, payload })

export const actionDeletePosts = (payload) => ({ type: DELETE_POST, payload })

export const actionGetAllPosts = (payload) => ({ type: GET_ALL_POST, payload })

export const actionGetCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
})

export const actionPostDeleteAllInform = (payload) => ({
  type: POST_DELETE_ALL_INFORM,
  payload,
})

export const actionpostPlusOrMinusLike = (payload) => ({
  type: POST_PLUS_OR_MINUS_LIKE,
  payload,
})

export const actionputPostFromDispatch = (payload) => ({
  type: POST_PUT,
  payload,
})

export const actionSaveImgPost = (payload) => ({
  type: SAVE_IMG_POST,
  payload,
})

export const actionTogleIsFetching = (payload) => ({
  type: TOGLE_IS_FETCHING,
  payload,
})

// export const actionShowChoosePost = (payload) => ({
//   type: SHOW_INFO_FIND_USER,
//   payload,
// })

export const actionShowAllCommenstForPost = (payload) => ({
  type: SHOW_ALL_COMMENTS_FOR_POST,
  payload,
})

export const actionCommentPlusOrMinusLike = (payload) => ({
  type: COMMENTS_PLUS_OR_MINUS_LIKE,
  payload,
})
// USER

export const userIsAuth = (payload) => ({ type: USER_IS_AUTH, payload })

export const userDeleteAllInform = (payload) => ({
  type: USER_DELETE_ALL_INFORM,
  payload,
})

// export const takeInformUser = (payload) => ({
//   type: INFORM_USER,
//   payload,
// })

export const actiongetAllUsers = (payload) => ({
  type: GET_ALL_USERS,
  payload,
})

export const actionUsersGetCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE_USERS,
  payload: page,
})

export const actionDeleteUser = (payload) => ({
  type: DELETE_USER,
  payload,
})

export const actionUserUpdateInform = (payload) => ({
  type: USER_UPDATE_INFORM,
  payload,
})

export const actionSaveUserAvatar = (payload) => ({
  type: SAVE_AVATAR_USER,
  payload,
})

export const actionShowChooseUser = (payload) => ({
  type: SHOW_INFO_CHOOSE_USER,
  payload,
})

export const actionTogleIsFetchingUser = (payload) => ({
  type: TOGLE_IS_FETCHING_USER,
  payload,
})

// AUTH

export const actionShowChoosePost = (payload) => ({
  type: SHOW_INFO_FIND_USER,
  payload,
})

export const takeInformUser = (payload) => ({
  type: INFORM_USER,
  payload,
})
