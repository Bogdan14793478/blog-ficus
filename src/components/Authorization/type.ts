export type ValuesType = {
  email: string
  password: string
}
export interface DataType extends ValuesType {
  type: string
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

export type ObjectComment = {
  children: ObjectComment[]
  commentedBy: string
  dateCreated: string
  followedCommentID: null | string
  likes: string[]
  postID: string
  text: string
  __v: number
  _id: string
}
