/* eslint-disable no-console */
import React, { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Register from "./components/Authorization/Register"
// eslint-disable-next-line prettier/prettier
import {getRegisterUrl} from "./api/getPost"
import Login from "./components/Authorization/Login"

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
          console.log(result, "dfdf")
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
        <Route path="/login" setUser={setUser} render={() => <Login />} />
        <Route path="/register" setUser={setUser} render={() => <Register />} />

        <Route path="/homepage" />
      </Switch>
    </Router>
  )
}
