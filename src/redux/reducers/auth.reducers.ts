/* eslint-disable no-case-declarations */
import { INFORM_USER, SAVE_AVATAR_USER, USER_UPDATE_INFORM } from "../actions/const"

export type InitialType = {
  dateCreated: string
  name: string
  skills: string
  profession: string
  details: string
  avatar: string
  informUser: string
  id: string
}

const initial: InitialType = {
  dateCreated: "",
  name: "",
  skills: "",
  profession: "",
  details: "",
  avatar: "",
  informUser: "",
  id: "",
}

export const authReducer = (state = initial, action: any): InitialType => {
  switch (action.type) {
    case INFORM_USER:
      return {
        ...state,
        informUser: action.payload.email,
        id: action.payload._id,
        dateCreated: action.payload.dateCreated,
        name: action.payload.name,
        skills: action.payload.skills,
        profession: action.payload.profession,
        details: action.payload.details,
        avatar: action.payload.avatar,
      }
    case USER_UPDATE_INFORM:
      return {
        ...state,
        name: action.payload.data.name,
        skills: action.payload.data.skills,
        profession: action.payload.data.profession,
        details: action.payload.data.details,
      }
    case SAVE_AVATAR_USER:
      return {
        ...state,
        avatar: action.payload.res.data.avatar,
      }
    default:
      return state
  }
}
