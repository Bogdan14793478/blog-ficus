/* eslint-disable no-case-declarations */
import {
  ActionTypes,
  ActionUserUpdateInform,
  TakeInformUser,
  ActionSaveAvatarUser,
} from "../actions/typeActionAuth"

export type InitialType = {
  dateCreated?: string
  name?: string
  skills?: string
  profession?: string
  details?: string
  avatar: string | null
  informUser: string
  id?: string
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

type Actions = TakeInformUser | ActionUserUpdateInform | ActionSaveAvatarUser

export const authReducer = (state = initial, action: Actions): InitialType => {
  switch (action.type) {
    case ActionTypes.INFORM_USER:
      return {
        ...state,
        id: action.payload._id,
        dateCreated: action.payload.dateCreated,
        name: action.payload.name,
        skills: action.payload.skills,
        profession: action.payload.profession,
        details: action.payload.details,
        avatar: action.payload.avatar,
      }
    case ActionTypes.USER_UPDATE_INFORM:
      return {
        ...state,
        name: action.payload.name,
        skills: action.payload.skills,
        profession: action.payload.profession,
        details: action.payload.details,
      }
    case ActionTypes.SAVE_AVATAR_USER:
      return {
        ...state,
        avatar: action.payload.res.avatar,
      }
    default:
      return state
  }
}
