import React from "react"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { useRoutes } from "./components/Authorization/routs"

export function App() {
  const routes = useRoutes()

  return <BrowserRouter>{routes}</BrowserRouter>
}
