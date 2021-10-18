import React from "react"
import "./App.css"
import { Switch, Route } from "react-router-dom"
import { Register } from "./components/Authorization/Register"
import { Login } from "./components/Authorization/Login"
import { HomePage } from "./components/Pages/HomePage"

export function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/register" component={Register} />

      <Route exact path="/home" component={HomePage} />

      <Route path="*" component={() => "404 Page not found"} />
    </Switch>
  )
}
