import React from "react"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { registerOrLogin } from "./utils/authorization"
import { AuthContext } from "./components/Authorization/AuthContext"
import { useRoutes } from "./components/Authorization/routs"

export function App() {
  const isLogin = !!localStorage.getItem("passport")
  console.log(isLogin, "isLogin")
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{ isLogin }}>
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  )
}
