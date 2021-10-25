import React from "react"
import "./App.css"
import { ThemeProvider } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { useRoutes } from "./hooks/useRouts"
// eslint-disable-next-line import/order
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { theme } from "./utils/themeNavbar"

toast.configure()

export function App() {
  const routes = useRoutes()
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{routes}</ThemeProvider>
    </BrowserRouter>
  )
}
