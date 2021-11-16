import {
  GET_ALL_POST,
  CREATE_NEW_POST,
  DELETE_POST,
  SET_CURRENT_PAGE,
  POST_DELETE_ALL_INFORM,
  POST_PLUS_OR_MINUS_LIKE,
  POST_PUT,
  USER_IS_AUTH,
  USER_DELETE_ALL_INFORM,
  INFORM_USER,
  GET_ALL_USERS,
  SET_CURRENT_PAGE_USERS,
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

// USER

export const userIsAuth = (payload) => ({ type: USER_IS_AUTH, payload })

export const userDeleteAllInform = (payload) => ({
  type: USER_DELETE_ALL_INFORM,
  payload,
})

export const takeInformUser = (payload) => ({
  type: INFORM_USER,
  payload,
})

export const actiongetAllUsers = (payload) => ({
  type: GET_ALL_USERS,
  payload,
})

export const actionUsersGetCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE_USERS,
  payload: page,
})
