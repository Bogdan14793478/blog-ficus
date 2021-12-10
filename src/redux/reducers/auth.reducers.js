/* eslint-disable no-case-declarations */
import { INFORM_USER } from "../actions/const"

const initial = {
  dateCreated: "",
  name: "",
  skills: "",
  profession: "",
  details: "",
  avatar: "",
  informUser: "",
  id: "",
}

export const authReducer = (state = initial, action) => {
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
    default:
      return state
  }
}
