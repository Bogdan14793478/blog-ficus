import React from "react"
import { Route, Switch } from "react-router"
import { PrivateRoute } from "./PrivateRouter"
import { Login } from "./Login"
import { Register } from "./Register"
import { HomePage } from "../Pages/HomePage"

export const useRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/home" component={HomePage} />
      <Route exact path="/login" component={Login} />

      <Route exact path="/register" component={Register} />
      <Route path="*" component={() => "404 Page not found"} />
    </Switch>
  )
}
