import {
  CreateNewPost,
  GET_ALL_POSTInt,
  POST_PLUS_OR_MINUS_LIKEInt,
  POST_PUTInt,
  SAVE_IMG_POSTInt,
  SAVE_IMG_POST_PUTInt,
} from "./interface"

// eslint-disable-next-line no-shadow
export enum ActionTypesPost {
  GET_ALL_POST = "GET_ALL_POST",
  CREATE_NEW_POST = "CREATE_NEW_POST",
  DELETE_POST = "DELETE_POST",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  POST_DELETE_ALL_INFORM = "POST_DELETE_ALL_INFORM",
  POST_PLUS_OR_MINUS_LIKE = "POST_PLUS_OR_MINUS_LIKE",
  POST_PUT = "POST_PUT",
  SAVE_IMG_POST = "SAVE_IMG_POST",
  SAVE_IMG_POST_PUT = "SAVE_IMG_POST_PUT",
  TOGLE_IS_FETCHING = "TOGLE_IS_FETCHING",
}

export type Action<T> = { type: `${ActionTypesPost}`; payload: T }
export type Action2<T, P> = { type: T; payload: P }

export type CreateNewPostType = Action2<
  ActionTypesPost.CREATE_NEW_POST,
  CreateNewPost
>
export const actionCreateNewPosts = (payload: CreateNewPost): CreateNewPostType => ({
  type: ActionTypesPost.CREATE_NEW_POST,
  payload,
})

export type SaveImgPostType = Action2<
  ActionTypesPost.SAVE_IMG_POST,
  SAVE_IMG_POSTInt
>
export const actionSaveImgPost = (payload: SAVE_IMG_POSTInt): SaveImgPostType => ({
  type: ActionTypesPost.SAVE_IMG_POST,
  payload,
})

export type DeletePostType = Action2<ActionTypesPost.DELETE_POST, string>
export const actionDeletePosts = (payload: string): DeletePostType => ({
  type: ActionTypesPost.DELETE_POST,
  payload,
})

export type GetAllPostType = Action2<ActionTypesPost.GET_ALL_POST, GET_ALL_POSTInt>
export const actionGetAllPosts = (payload: GET_ALL_POSTInt): GetAllPostType => ({
  type: ActionTypesPost.GET_ALL_POST,
  payload,
})

export type TogleIsFetchingType = Action2<ActionTypesPost.TOGLE_IS_FETCHING, boolean>
export const actionTogleIsFetching = (payload: boolean): TogleIsFetchingType => ({
  type: ActionTypesPost.TOGLE_IS_FETCHING,
  payload,
})

export type GetCurrentPageType = Action2<ActionTypesPost.SET_CURRENT_PAGE, number>
export const actionGetCurrentPage = (page: number): GetCurrentPageType => ({
  type: ActionTypesPost.SET_CURRENT_PAGE,
  payload: page,
})

export type DeleteAllInformType = Action2<ActionTypesPost.POST_DELETE_ALL_INFORM, []>
export const actionPostDeleteAllInform = (payload: []): DeleteAllInformType => ({
  type: ActionTypesPost.POST_DELETE_ALL_INFORM,
  payload,
})

export type PlusOrMinusLikeType = Action2<
  ActionTypesPost.POST_PLUS_OR_MINUS_LIKE,
  POST_PLUS_OR_MINUS_LIKEInt
>
export const actionpostPlusOrMinusLike = (
  payload: POST_PLUS_OR_MINUS_LIKEInt
): PlusOrMinusLikeType => ({
  type: ActionTypesPost.POST_PLUS_OR_MINUS_LIKE,
  payload,
})

export type PostFromDispatchType = Action2<ActionTypesPost.POST_PUT, POST_PUTInt>
export const actionputPostFromDispatch = (
  payload: POST_PUTInt
): PostFromDispatchType => ({
  type: ActionTypesPost.POST_PUT,
  payload,
})

export type SaveImgPutType = Action2<
  ActionTypesPost.SAVE_IMG_POST_PUT,
  SAVE_IMG_POST_PUTInt
>
export const actionSaveImgPostPUT = (
  payload: SAVE_IMG_POST_PUTInt
): SaveImgPutType => ({
  type: ActionTypesPost.SAVE_IMG_POST_PUT,
  payload,
})
