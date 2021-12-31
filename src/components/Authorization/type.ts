export type AuthFormData = {
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

export type ObjectUserAuth = {
  avatar: string
  dateCreated: string
  details: string
  email: string
  __v?: number
  name: string
  profession: string
  skills: string
  _id: string
}

export type ObjectPost = {
  image?: string
  dateCreated: string
  description: string
  likes: string[]
  __v?: number
  postedBy: string
  title: string
  _id: string
}

export interface DataGetAllPosts {
  _id: string
  title?: string
  fullText?: string
  description: string
  dateCreated: string
  image?: string
  likes: string[]
  postedBy?: string
  __v?: number
}

export interface AllGetAllPosts {
  _id: string
  title: string
  description: string
  dateCreated: string
  likes: string[]
  postedBy: string
  image?: string
  fullText?: string
  __v?: number
  followedCommentID?: string | null
  text?: string
}

export interface AllCommentsForPosts {
  children: AllCommentsForPosts[]
  followedCommentID: string | null
  commentedBy: string
  dateCreated: string
  likes: string[]
  postID: string
  text: string
  __v: number
  _id: string
}

export interface CommentForComment extends DataGetAllPosts {
  commentedBy: string
  followedCommentID: string
  postID: string
  text: string
}

export interface OnePost {
  _id: string
  title: string
  description: string
  dateCreated: string
  likes: string[]
  postedBy: string | null
  fullText: string
  __v: number
}

export type ParamValues = {
  followedCommentID: string | null
  numberPostID?: string
  text: string
  _id: string
  commentedBy?: string
}
export interface ObjectComment extends ParamValues {
  children?: ObjectComment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
}

export type FindUserObj = {
  dateCreated: string
  details: string
  email: string
  name: string
  profession: string
  skills: string
  __v: number
  _id: string
}
