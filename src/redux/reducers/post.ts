import {
  GET_ALL_POST,
  CREATE_NEW_POST,
  DELETE_POST,
  GET_ALL_POST_FAILURE,
  SET_CURRENT_PAGE,
  POST_DELETE_ALL_INFORM,
  POST_PLUS_OR_MINUS_LIKE,
  POST_PUT,
  SAVE_IMG_POST,
  SAVE_IMG_POST_PUT,
  TOGLE_IS_FETCHING,
  // TOGLE_IS_LOAD_FETCHING_POST,
} from "../actions/const"
/* eslint-disable no-case-declarations */
type ArrError = string[]
type ArrLikes = string[]
type ArrPosts = {
  _id: String
  likes: ArrLikes[]
  title: string
  description: string
  dateCreated: string
  postedBy: string | null
  image: string
  __v: number
}
export type InitialType = {
  posts: ArrPosts[]
  error: ArrError[]
  currentPage: number
  skip: number
  totalPost: number
  image: string
  isFetching: boolean
}

const initial: InitialType = {
  posts: [],
  error: [],
  currentPage: 1,
  skip: 10,
  totalPost: 0,
  image: "",
  isFetching: false,
}

export const userPosts = (state = initial, action: any): InitialType => {
  switch (action.type) {
    case TOGLE_IS_FETCHING:
      return { ...state, isFetching: action.payload }
    case GET_ALL_POST:
      const totalPostsFromBack = Math.ceil(action.payload.pagination.total / 10)
      return {
        ...state,
        posts: [...action.payload.payload],
        skip: state.skip,
        totalPost: totalPostsFromBack,
      }
    case GET_ALL_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      }
    case CREATE_NEW_POST:
      return { ...state, posts: [...state.posts, action.payload.data] }
    case SAVE_IMG_POST:
      const statePostImg = [...state.posts]
      const imgData = action.payload.fileUploadResponse.data.image
      const imgPost = action.payload.numberPost
      const findImgIndx = statePostImg.findIndex(
        findImgPost => findImgPost._id === imgPost
      )
      const findImgPost = statePostImg[findImgIndx]
      findImgPost.image = imgData
      return {
        ...state,
        posts: statePostImg,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
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
      const posts = [...state.posts]
      const findInx = posts.findIndex(post => post._id === action.payload.itemId)
      const post = posts[findInx]
      const foundedLike = post.likes.find(like => like === action.payload.userId)
      if (foundedLike) {
        post.likes = post.likes.filter(like => like !== foundedLike)
      } else {
        post.likes.push(action.payload.userId)
      }
      return {
        ...state,
        posts,
      }
    case POST_PUT:
      const statePosts = [...state.posts]
      const { data } = action.payload
      const postId = action.payload.numberPost

      const findIndx = statePosts.findIndex(putPost => putPost._id === postId)
      const findPost = statePosts[findIndx]

      findPost.title = data.title
      findPost.description = data.description
      findPost.postedBy = data.fullText

      return { ...state, posts: statePosts }
    case SAVE_IMG_POST_PUT:
      const statePostImgPut = [...state.posts]
      const imgDataPut = action.payload.res.image
      const imgPostPut = action.payload.numberPost
      const findImgIndxPut = statePostImgPut.findIndex(
        findImgPostPut => findImgPostPut._id === imgPostPut
      )
      const findImgPostPut = statePostImgPut[findImgIndxPut]
      findImgPostPut.image = imgDataPut
      return {
        ...state,
        posts: statePostImgPut,
      }

    default:
      return state
  }
}
