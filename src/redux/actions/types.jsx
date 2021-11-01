import {
  GET_ALL_POST,
  CREATE_NEW_POST,
  ERROR_CREATE_NEW_POST,
  DELETE_POST,
  ERROR_DELETE_POST,
  GET_ALL_POST_FAILURE,
  SET_CURRENT_PAGE,
  POST_DELETE_ALL_INFORM,
  USER_IS_AUTH,
  USER_DELETE_ALL_INFORM,
} from "./const"

// POST
export const actionCreateNewPosts = (payload) => ({ type: CREATE_NEW_POST, payload })

export const actionErrorCreateNewPosts = (payload) => ({
  type: ERROR_CREATE_NEW_POST,
  payload,
})

export const actionDeletePosts = (payload) => ({ type: DELETE_POST, payload })

export const actionErrorDeletePosts = (payload) => ({
  type: ERROR_DELETE_POST,
  payload,
})

export const actionGetAllPosts = (payload) => ({ type: GET_ALL_POST, payload })

export const getAllPostFailure = (payload) => ({
  type: GET_ALL_POST_FAILURE,
  payload,
})

export const actionGetCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
})

export const postDeleteAllInform = (payload) => ({
  type: POST_DELETE_ALL_INFORM,
  payload,
})

// USER

export const userIsAuth = (payload) => ({ type: USER_IS_AUTH, payload })

export const userDeleteAllInform = (payload) => ({
  type: USER_DELETE_ALL_INFORM,
  payload,
})
