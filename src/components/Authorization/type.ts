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
