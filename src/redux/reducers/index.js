import { combineReducers } from "redux"
import { userPosts } from "./post"
import { stateUserReduser } from "./users"

export const rootReducer = combineReducers({
  post: userPosts,
  user: stateUserReduser,
})
