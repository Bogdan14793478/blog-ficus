import React from "react"
import { Route, Switch } from "react-router"
import { PrivateRoute } from "../components/Authorization/PrivateRouter"
import { Login } from "../components/Authorization/Login"
import { Register } from "../components/Authorization/Register"
import { HomePage } from "../components/Pages/HomePage"

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
