import { combineReducers } from "redux"
import { userPosts } from "./post"
import { stateUserReduser } from "./users"
import { authReducer } from "./auth.reducers"

export const rootReducer = combineReducers({
  post: userPosts,
  user: stateUserReduser,
  auth: authReducer,
})
