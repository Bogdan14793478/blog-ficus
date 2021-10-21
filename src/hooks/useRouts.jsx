import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { PrivateRoute } from "../components/Authorization/PrivateRouter"
import { Login } from "../components/Authorization/Login"
import { Register } from "../components/Authorization/Register"
import { Profile } from "../components/Pages/Profile/Profile"
import { Dialogs } from "../components/Pages/Dialogs/Dialogs"
import { News } from "../components/Pages/News/News"
// import { Navbar } from "../components/Pages/Navbar/Navbar"
import "../App.css"
import { Ficus } from "../components/Pages/Ficus/Ficus"
import ButtonAppBar from "../components/Pages/Navbar/NavbarTwo"
import { HomePage } from "../components/Pages/HomePage/HomePage"

export const useRoutes = () => {
  const isAuth = !!localStorage.getItem("passport")
  if (!isAuth) {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/login" />
      </Switch>
    )
  }
  if (isAuth) {
    return (
      <div className="app-wrapper">
        {/* <ButtonAppBar /> */}
        <div className="app-wrapper-content">
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/dialogs" component={Dialogs} />
            <PrivateRoute exact path="/news" component={News} />
            <PrivateRoute exact path="/ficus" component={Ficus} />
            <PrivateRoute exact path="/home" component={HomePage} />

            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        </div>
      </div>
    )
  }
  return true
}
