export interface DateCreated {
  dateCreated: string
}

export interface Likes {
  likes: string[]
}
export interface PostedBy {
  postedBy: string
}

export interface Description {
  description: string
}
export interface Id {
  _id: string
}

export interface Title {
  title: string
}

export interface FullText {
  fullText: string
}

export interface User {
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

export interface AllGetAllUser extends User {
  extra_details: string
}

export interface SAVE_AVATAR_USERINT {
  res: User
}

export interface StandartData {
  details: string
  name: string
  profession: string
  skills: string
}

export interface UpdatePostRegisterArgsInt extends StandartData {
  userId?: string
  file?: File
}

export interface GET_ALL_USER {
  data: User[]
  pagination: PaginGetAll
}

export interface PaginGetAll {
  limit: number
  skip: string
  total: number
}

export interface Photo
  extends DateCreated,
    Likes,
    PostedBy,
    Description,
    Id,
    Title,
    FullText {
  image: string
  __v: number
}
export interface AllGetAllPosts
  extends DateCreated,
    Likes,
    PostedBy,
    Description,
    Id,
    Title {
  image?: string
  fullText?: string
  __v?: number
}
export interface DataPostPut extends Title, FullText, Description {
  file?: File
}
export interface CreateNewPost extends Description, Id, Title, FullText {
  fileUploadResponse: Photo
  postResponse: AllGetAllPosts
  postId?: string
  data: DataPostPut
  numberPost: string
  file?: File
}

export interface SAVE_IMG_POSTInt {
  numberPost: string
  fileUploadResponse: Photo
}

export interface GET_ALL_POSTInt {
  pagination: PaginGetAll
  payload: AllGetAllPosts[]
}

export interface POST_PLUS_OR_MINUS_LIKEInt {
  itemId: string
  userId?: string
}

export interface POST_PUTInt {
  rest: DataPostPut
  file?: File
  numberPost?: string
  postId?: string
}

export interface SAVE_IMG_POST_PUTInt {
  numberPost?: string
  res: Photo
}
