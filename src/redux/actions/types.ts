// eslint-disable-next-line no-shadow
export enum ActionTypes {
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
  USER_IS_AUTH = "USER_IS_AUTH",
  USER_DELETE_ALL_INFORM = "USER_DELETE_ALL_INFORM",
  INFORM_USER = "INFORM_USER",
  GET_ALL_USERS = "GET_ALL_USERS",
  SET_CURRENT_PAGE_USERS = "SET_CURRENT_PAGE_USERS",
  USER_UPDATE_INFORM = "USER_UPDATE_INFORM",
  DELETE_USER = "DELETE_USER",
  SAVE_AVATAR_USER = "SAVE_AVATAR_USER",
  SHOW_INFO_CHOOSE_USER = "SHOW_INFO_CHOOSE_USER",
  TOGLE_IS_FETCHING_USER = "TOGLE_IS_FETCHING_USER",
}

interface AllGetAllPosts {
  _id: string
  title: string
  description: string
  dateCreated: string
  likes: string[]
  postedBy: string
  image?: string
  fullText?: string
  __v?: number
}
export interface CreateNewPost {
  _id: string
  title: string
  fullText: string
  description: string
  fileUploadResponse: Photo
  postResponse: AllGetAllPosts
  file?: File
  postId?: string
  data: DataPostPut
  numberPost: string
}

interface DataGetAllPosts {
  _id: string
  title: string
  fullText?: string
  description: string
  dateCreated: string
  image?: string
  likes: string[]
  postedBy: string
}
interface PaginGetAll {
  limit: number
  skip: string
  total: number
}
export interface GET_ALL_POST {
  pagination: PaginGetAll
  payload: DataGetAllPosts[]
}

interface POST_PLUS_OR_MINUS_LIKE {
  itemId: string
  userId: string
}

interface DataPostPut {
  title: string
  fullText: string
  description: string
  file?: File
}

export interface POST_PUT {
  rest: DataPostPut
  file?: File
  numberPost?: string
  postId?: string
}
export interface Photo {
  dateCreated: string
  description: string
  fullText: string
  image: string
  likes: string[]
  postedBy: string
  title: string
  __v: number
  _id: string
}

export interface SAVE_IMG_POST {
  numberPost: string
  fileUploadResponse: Photo
}

export interface SAVE_IMG_POST_PUT {
  numberPost?: string
  res: Photo
}

export interface Users {
  avatar: string | null
  dateCreated?: string
  details?: string
  email?: string
  name?: string
  profession?: string
  skills?: string
  __v?: number
  _id?: string
}
export interface GET_ALL_USERS {
  data: Users[]
  pagination: PaginGetAll
}

export interface SAVE_AVATAR_USER {
  res: Users
}

export type Action<T> = { type: ActionTypes; payload: T }

// POST

export const actionCreateNewPosts = (
  payload: CreateNewPost
): Action<CreateNewPost> => ({
  type: ActionTypes.CREATE_NEW_POST,
  payload,
})

export const actionDeletePosts = (payload: string): Action<string> => ({
  type: ActionTypes.DELETE_POST,
  payload,
})

export const actionGetAllPosts = (payload: GET_ALL_POST): Action<GET_ALL_POST> => ({
  type: ActionTypes.GET_ALL_POST,
  payload,
})

export const actionGetCurrentPage = (page: number): Action<number> => ({
  type: ActionTypes.SET_CURRENT_PAGE,
  payload: page,
})

export const actionPostDeleteAllInform = (payload: []): Action<[]> => ({
  type: ActionTypes.POST_DELETE_ALL_INFORM,
  payload,
})

export const actionpostPlusOrMinusLike = (
  payload: POST_PLUS_OR_MINUS_LIKE
): Action<POST_PLUS_OR_MINUS_LIKE> => ({
  type: ActionTypes.POST_PLUS_OR_MINUS_LIKE,
  payload,
})

export const actionputPostFromDispatch = (payload: POST_PUT): Action<POST_PUT> => ({
  type: ActionTypes.POST_PUT,
  payload,
})

export const actionSaveImgPost = (
  payload: SAVE_IMG_POST
): Action<SAVE_IMG_POST> => ({
  type: ActionTypes.SAVE_IMG_POST,
  payload,
})

export const actionSaveImgPostPUT = (
  payload: SAVE_IMG_POST_PUT
): Action<SAVE_IMG_POST_PUT> => ({
  type: ActionTypes.SAVE_IMG_POST_PUT,
  payload,
})

export const actionTogleIsFetching = (payload: boolean): Action<boolean> => ({
  type: ActionTypes.TOGLE_IS_FETCHING,
  payload,
})

// USER

export const userIsAuth = (payload: boolean): Action<boolean> => ({
  type: ActionTypes.USER_IS_AUTH,
  payload,
})

export const userDeleteAllInform = (payload: []): Action<[]> => ({
  type: ActionTypes.USER_DELETE_ALL_INFORM,
  payload,
})

export const actiongetAllUsers = (
  payload: GET_ALL_USERS
): Action<GET_ALL_USERS> => ({
  type: ActionTypes.GET_ALL_USERS,
  payload,
})

export const actionUsersGetCurrentPage = (page: number): Action<number> => ({
  type: ActionTypes.SET_CURRENT_PAGE_USERS,
  payload: page,
})

export const actionDeleteUser = (payload: string): Action<string> => ({
  type: ActionTypes.DELETE_USER,
  payload,
})

export const actionUserUpdateInform = (payload: any): Action<any> => ({
  type: ActionTypes.USER_UPDATE_INFORM,
  payload,
})

export const actionShowChooseUser = (payload: string): Action<string> => ({
  type: ActionTypes.SHOW_INFO_CHOOSE_USER,
  payload,
})

export const actionTogleIsFetchingUser = (payload: boolean): Action<boolean> => ({
  type: ActionTypes.TOGLE_IS_FETCHING_USER,
  payload,
})

// AUTH

export const takeInformUser = (payload: Users): Action<Users> => ({
  type: ActionTypes.INFORM_USER,
  payload,
})

export const actionSaveUserAvatar = (
  payload: SAVE_AVATAR_USER
): Action<SAVE_AVATAR_USER> => ({
  type: ActionTypes.SAVE_AVATAR_USER,
  payload,
})
