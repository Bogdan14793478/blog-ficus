import { Post } from "../actions/interface"
import { ActionTypesPost } from "../actions/typeActionPost"

/* eslint-disable no-case-declarations */

export interface InitialPostType {
  posts: Post[]
  error: string[]
  currentPage: number
  skip: number
  totalPost: number
  isFetching: boolean
}

const initial: InitialPostType = {
  posts: [],
  error: [],
  currentPage: 1,
  skip: 10,
  totalPost: 0,
  isFetching: false,
}

export const userPosts = (state = initial, action: any): InitialPostType => {
  switch (action.type) {
    case ActionTypesPost.TOGLE_IS_FETCHING:
      return { ...state, isFetching: action.payload }
    case ActionTypesPost.GET_ALL_POST:
      const totalPostsFromBack = Math.ceil(action.payload.pagination.total / 10)
      return {
        ...state,
        posts: [...action.payload.payload],
        skip: state.skip,
        totalPost: totalPostsFromBack,
      }
    case ActionTypesPost.CREATE_NEW_POST:
      return { ...state, posts: [...state.posts, action.payload] }
    case ActionTypesPost.SAVE_IMG_POST:
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
    case ActionTypesPost.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      }
    case ActionTypesPost.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case ActionTypesPost.POST_DELETE_ALL_INFORM:
      return {
        ...state,
        posts: [],
      }
    case ActionTypesPost.POST_PLUS_OR_MINUS_LIKE:
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
    case ActionTypesPost.POST_PUT:
      const statePosts = [...state.posts]
      const data = action.payload.rest
      const postId = action.payload.numberPost

      const findIndx = statePosts.findIndex(putPost => putPost._id === postId)
      const findPost = statePosts[findIndx]
      findPost.title = data.title
      findPost.description = data.description
      findPost.postedBy = data.fullText

      return { ...state, posts: statePosts }
    case ActionTypesPost.SAVE_IMG_POST_PUT:
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
