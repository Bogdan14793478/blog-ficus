import {
  GET_ALL_POST,
  CREATE_NEW_POST,
  ERROR_CREATE_NEW_POST,
  DELETE_POST,
  ERROR_DELETE_POST,
  GET_ALL_POST_FAILURE,
  SET_CURRENT_PAGE,
  SET_PER_PAGE,
} from "./const"
// export const GET_ALL_POST = "GET_ALL_POST"

// export const CREATE_NEW_POST = "CREATE_NEW_POST"

// export const ERROR_CREATE_NEW_POST = "ERROR_CREATE_NEW_POST"

// export const DELETE_POST = "DELETE_POST"

// export const ERROR_DELETE_POST = "ERROR_DELETE_POST"

// export const GET_ALL_POST_FAILURE = "GET_ALL_POST_FAILURE"

// export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

// export const SET_PER_PAGE = "SET_PER_PAGE"

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

export const actionGetCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload,
})

export const actionGetSetPerPage = (payload) => ({
  type: SET_PER_PAGE,
  payload,
})
