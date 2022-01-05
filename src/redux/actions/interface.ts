import { Initial as InitialUserType } from "../reducers/users"

export interface User {
  avatar?: string | null
  dateCreated?: string
  details?: string
  email: string
  name?: string
  profession?: string
  skills?: string
  extra_details?: string
  __v?: number
  _id: string
}

export type UpdateUser = Omit<User, "_id" | "__v" | "dateCreated" | "email">

export interface RegistrationData {
  email: string
  password: string
}

export interface Pagination {
  limit: number
  skip: string
  total: number
}

export interface AuthFormData {
  password: string
  email: string
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

export interface Post {
  _id: string
  dateCreated: string
  likes: string[]
  description: string
  title: string
  fullText: string
  __v: number
  postedBy: string | null
  image: string
}

export type CreatePost = Pick<Post, "title" | "fullText" | "description"> & {
  file?: File
}

export type UpdatePost = CreatePost & Pick<Post, "_id">

export type Comment = {
  text: string
  _id: string
  children?: Comment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
  numberPostID?: string
  commentedBy?: string
  followedCommentID: string | null
}

export type CreateComment = Pick<Comment, "text" | "followedCommentID">
export type UpdateComment = Pick<Comment, "text">

export interface RootState {
  user: InitialUserType
  isAuth: boolean
}
