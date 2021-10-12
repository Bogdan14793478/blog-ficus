import React from "react"
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Register } from "./components/Authorization/Register"
import { Login } from "./components/Authorization/Login"
import { HomePage } from "./components/Pages/HomePage"

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />

        <Route path="/register" component={Register} />

        <Route path="/home" component={HomePage} />
      </Switch>
    </Router>
  )
}
