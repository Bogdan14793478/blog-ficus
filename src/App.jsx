import React, { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Register } from "./components/Authorization/Register"
import { getRegisterUrl } from "./api/getPost"
import { Login } from "./components/Authorization/Login"
import { HomePage } from "./components/Pages/HomePage"

export function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")))

  useEffect(() => {
    const token = localStorage.getItem("passport") || ""
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }

    if (user === null && token.length > 0) {
      axios.get(getRegisterUrl, config).then((result) => {
        if (result.data) {
          sessionStorage.setItem("user", JSON.stringify(result.data))
          setUser(result.data)
        } else {
          sessionStorage.removeItem("user")
        }
      })
    }
  }, [user])

  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />

        <Route path="/" render={() => <HomePage />} />
      </Switch>
    </Router>
  )
}
