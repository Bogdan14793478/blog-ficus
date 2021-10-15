import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { App } from "./App"
import { rootReducer } from "./redux/redusers/index"

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById("root")
)
