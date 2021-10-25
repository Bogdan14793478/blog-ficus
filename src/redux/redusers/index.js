import { combineReducers } from "redux"
import { userPosts } from "./post"
import { stateUserReduser } from "./isLogged"

export const rootReducer = combineReducers({
  post: userPosts,
  user: stateUserReduser,
})
