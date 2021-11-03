import {
  GET_ALL_POST,
  CREATE_NEW_POST,
  DELETE_POST,
  ERROR_DELETE_POST,
  GET_ALL_POST_FAILURE,
  ERROR_CREATE_NEW_POST,
  SET_CURRENT_PAGE,
  POST_DELETE_ALL_INFORM,
} from "../actions/const"
/* eslint-disable no-case-declarations */
const initial = {
  posts: [],
  error: [],
  currentPage: 1,
  skip: 10,
  totalPost: 0,
}

export const userPosts = (state = initial, action) => {
  console.log(action.payload, " action.type")
  switch (action.type) {
    case GET_ALL_POST:
      return {
        ...state,
        posts: [...action.payload.data],
        skip: state.skip,
        totalPost: Math.ceil(action.payload.pagination.total / 10),
      }
    case GET_ALL_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      }
    case CREATE_NEW_POST:
      return { ...state, posts: [...state.posts, action.payload.data] }
    case ERROR_CREATE_NEW_POST:
      return {
        ...state,
        error: action.payload.error,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }
    case ERROR_DELETE_POST:
      return {
        ...state,
        error: action.payload.error,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case POST_DELETE_ALL_INFORM:
      return {
        ...state,
        posts: [],
      }
    default:
      return state
  }
}
