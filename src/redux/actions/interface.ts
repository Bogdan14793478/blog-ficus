import { UserType } from "../reducers/users"

export interface DateCreated {
  dateCreated: string
}

export interface Details {
  details: string
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

export interface Email {
  email: string
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

export interface Image {
  image: string
}

export interface Title {
  title: string
}

export interface Text {
  text: string
}

export interface NumberPost {
  numberPost: string
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

export interface UserObj extends DateCreated, Details, Email {
  avatar?: string | null
  name: string
  profession: string
  skills: string
  __v: number
  _id: string
}

export interface AllGetAllUser extends User {
  extra_details?: string
}

interface IdPlusEmail extends Email {
  _id: string
}
export interface onSubmitRegistr extends AllGetAllUser {
  data?: IdPlusEmail
  password: string
}

export interface SAVE_AVATAR_USERINT {
  res: User
}

export interface StandartData extends Details {
  name: string
  profession: string
  skills: string
}

export interface StandartDataPost extends FullText, Description, Title {
  file?: File
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

export interface Blank
  extends DateCreated,
    Likes,
    PostedBy,
    Description,
    Id,
    Title {}

export interface Photo extends Image, Blank, FullText {
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
export interface CreateNewPost extends NumberPost, Description, Id, Title, FullText {
  fileUploadResponse: Photo
  postResponse: AllGetAllPosts
  postId?: string
  data: DataPostPut
  file?: File
}

export interface SAVE_IMG_POSTInt extends NumberPost {
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

export interface AuthFormData extends Email {
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

export interface CreateNewCommit extends Text, FollowedCommentID {
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

export interface ParamValuesUpd extends Text, Id {
  followedCommentID: string
  numberPostID: string
  commentedBy?: string
}

export interface ObjectComment extends ParamValues {
  children?: ObjectComment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
}

export type Comment = {
  text: string
  _id: string
  children?: ObjectComment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
  numberPostID?: string
  commentedBy?: string
  followedCommentID: string | null
}

export interface ObjectCommentUpd extends ParamValuesUpd {
  children?: ObjectComment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
}

export interface Posts extends Image, Blank {
  __v: number
}

export interface InitialType extends Image {
  posts: Posts[]
  error: string[]
  currentPage: number
  skip: number
  totalPost: number
  isFetching: boolean
}

export interface RootState {
  user: UserType
  isAuth: boolean
}

export interface TypeAuthReducers {
  dateCreated?: string
  name?: string
  skills?: string
  profession?: string
  details?: string
  avatar?: string | null
  informUser: string
  id?: string
}
