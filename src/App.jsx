import React from "react"
import "./App.css"
import { ThemeProvider } from "@mui/material"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"

import { PrivateRoute } from "./components/Authorization/PrivateRouter"

// import { useRoutes } from "./hooks/useRouts"
// eslint-disable-next-line import/order
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { theme } from "./utils/themeNavbar"
import { NavbarMaterial } from "./components/Pages/Navbar/NavbarMaterial"
import { Login } from "./components/Authorization/Login"
import { Register } from "./components/Authorization/Register"
import { Profile } from "./components/Pages/Profile/Profile"
import { Dialogs } from "./components/Pages/Dialogs/Dialogs"
import { News } from "./components/Pages/News/News"
import { Ficus } from "./components/Pages/Ficus/Ficus"
import { HomePage } from "./components/Pages/HomePage/HomePage"

toast.configure()

export function App() {
  const isAuth = useSelector((state) => state.user.isAuth)

  if (!isAuth) {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    )
  }
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="app-wrapper">
            <NavbarMaterial />
            <div className="app-wrapper-content">
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/dialogs" component={Dialogs} />
                <PrivateRoute exact path="/news" component={News} />
                <PrivateRoute exact path="/ficus" component={Ficus} />
                <PrivateRoute exact path="/home" component={HomePage} />

                <Redirect to="/home" />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
