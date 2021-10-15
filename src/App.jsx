import React from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Register } from "./components/Authorization/Register"
import { Login } from "./components/Authorization/Login"
import { HomePage } from "./components/Pages/HomePage"

export function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <Route exact path="/register" component={Register} />

      <Route path="*" component={() => "404 Page not found"} />

      <Route exact path="/home" component={HomePage} />
    </Switch>
  )
}
