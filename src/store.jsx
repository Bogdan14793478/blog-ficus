import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { rootReducer } from "./redux/redusers"

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))
)
