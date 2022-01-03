export interface DateCreated {
  dateCreated: string
}

export interface Likes {
  likes: string[]
}
export interface PostedBy {
  postedBy: string
}

export interface PostID {
  postID: string
}

export interface FollowedCommentID {
  followedCommentID: null | string
}

export interface CommentedBy {
  commentedBy: string
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

export interface Text {
  text: string
}

export interface FullText {
  fullText: string
}

export interface V {
  __v: number
}

export interface User {
  avatar?: string | null
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
  extra_details?: string
}

interface IdPlusEmail {
  email: string
  _id: string
}
export interface onSubmitRegistr extends AllGetAllUser {
  data?: IdPlusEmail
  password: string
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

export interface GetAllPostsRegisterArgs {
  skip: string
  numberId?: null | string
  searchPosts?: string
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

export interface AuthFormData {
  email: string
  password: string
}
// eslint-disable-next-line no-shadow
export enum SubmitFormType {
  Login = "login",
  SignUp = "register",
}
type SubmitType = `${SubmitFormType}`
export interface DataType extends AuthFormData {
  type: SubmitType
}

export interface DataPost extends Description, FullText, Title {}

export interface CreateNewCommit extends FollowedCommentID {
  text: string
  _id?: string
  postID?: string
}

export interface DataGetAllPosts extends Id, Description, DateCreated, Likes {
  title?: string
  fullText?: string
  image?: string
  postedBy?: string
  __v?: number
}

export interface AllCommentsForPosts
  extends FollowedCommentID,
    CommentedBy,
    DateCreated,
    Likes,
    PostID,
    Text,
    V,
    Id {
  children: AllCommentsForPosts[]
}

export interface CommentForComment
  extends DataGetAllPosts,
    CommentedBy,
    FollowedCommentID,
    PostID,
    Text {}

export interface OnePost
  extends Id,
    Title,
    Description,
    DateCreated,
    Likes,
    FullText,
    V {
  postedBy: string | null
}

export interface ParamValues extends FollowedCommentID, Text, Id {
  numberPostID?: string
  commentedBy?: string
}

export interface ObjectComment extends ParamValues {
  children?: ObjectComment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
}
