import React from "react"
import "./App.css"

import { ThemeProvider } from "@mui/material"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import { PrivateRoute } from "./components/Authorization/PrivateRouter"
// eslint-disable-next-line import/order
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { theme } from "./utils/themeNavbar"
import { NavbarMaterial } from "./components/Pages/Navbar/NavbarMaterial"
import { Login } from "./components/Authorization/Login"
import { Register } from "./components/Authorization/Register"
import { Users } from "./components/Pages/Users/Users"
import { Dialogs } from "./components/Pages/Dialogs/Dialogs"
import { News } from "./components/Pages/News/News"
import { HomePage } from "./components/Pages/HomePage/HomePage"
import history from "./components/history"

toast.configure()

export function App() {
  const isAuth = useSelector((state) => state.user.isAuth)

  return (
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
        <Switch>
          {!isAuth ? (
            <>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Redirect to="/" />
            </>
          ) : (
            <>
              <div className="app-wrapper">
                <NavbarMaterial />
                <div className="app-wrapper-content">
                  <PrivateRoute exact path="/users" component={Users} />
                  <PrivateRoute exact path="/ficus" component={Dialogs} />
                  <PrivateRoute exact path="/news" component={News} />`
                  <PrivateRoute
                    exact
                    path="/posts/page/:page"
                    component={HomePage}
                  />
                </div>
              </div>
            </>
          )}
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  )
}
