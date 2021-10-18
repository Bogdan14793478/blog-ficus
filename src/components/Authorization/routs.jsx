import React from "react"
import { Route, Switch } from "react-router"
import { Login } from "./Login"
import { Register } from "./Register"
import { HomePage } from "../Pages/HomePage"

export const useRoutes = (isLogin) => {
  if (isLogin) {
    return (
      <Switch>
        <Route exact path="/home" component={HomePage} />

        <Route path="*" component={() => "404 Page not found"} />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/register" component={Register} />
    </Switch>
  )
}
