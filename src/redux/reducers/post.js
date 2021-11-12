/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import {
  GET_ALL_POST,
  CREATE_NEW_POST,
  DELETE_POST,
  ERROR_DELETE_POST,
  GET_ALL_POST_FAILURE,
  ERROR_CREATE_NEW_POST,
  SET_CURRENT_PAGE,
  POST_DELETE_ALL_INFORM,
  POST_PLUS_OR_MINUS_LIKE,
} from "../actions/const"
/* eslint-disable no-case-declarations */
const initial = {
  posts: [{ likes: [] }],
  error: [],
  currentPage: 1,
  skip: 10,
  totalPost: 0,
}

export const userPosts = (state = initial, action) => {
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
    case POST_PLUS_OR_MINUS_LIKE:
      // eslint-disable-next-line array-callback-return
      const findInx = state.posts.findIndex((post) => {
        return post._id === action.payload.postId
      })
      const stateNew = state.posts[findInx].likes.includes(action.payload.userId)
        ? state.posts[findInx].likes.splice(
            state.posts[findInx].likes.find(
              (like) => like === action.payload.userId
            ),
            1
          )
        : state.posts[findInx].likes.push(action.payload.userId)

      return {
        ...state,
        likes: stateNew,
      }
    default:
      return state
  }
}
