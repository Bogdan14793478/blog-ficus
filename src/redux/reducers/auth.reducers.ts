/* eslint-disable no-case-declarations */
import {
  ActionTypes,
  ActionUserUpdateInform,
  TakeInformUser,
  ActionSaveAvatarUser,
} from "../actions/typeActionAuth"
import { TypeAuthReducers } from "../actions/interface"

const initial: TypeAuthReducers = {
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

export const authReducer = (state = initial, action: Actions): TypeAuthReducers => {
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
