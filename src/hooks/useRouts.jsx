import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { PrivateRoute } from "../components/Authorization/PrivateRouter"
import { Login } from "../components/Authorization/Login"
import { Register } from "../components/Authorization/Register"
import { Profile } from "../components/Pages/Profile/Profile"
import { Dialogs } from "../components/Pages/Dialogs/Dialogs"
import { News } from "../components/Pages/News/News"
import "../App.css"
import { Ficus } from "../components/Pages/Ficus/Ficus"
import { NavbarMaterial } from "../components/Pages/Navbar/NavbarMaterial"
import { HomePage2Code } from "../components/Pages/HomePage/HomePage2Code"

export const useRoutes = () => {
  const isAuth = !!localStorage.getItem("passport")
  if (!isAuth) {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/register" />
      </Switch>
    )
  }
  if (isAuth) {
    return (
      <div>
        <div className="app-wrapper">
          <NavbarMaterial />
          <div className="app-wrapper-content">
            <Switch>
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/dialogs" component={Dialogs} />
              <PrivateRoute exact path="/news" component={News} />
              <PrivateRoute exact path="/ficus" component={Ficus} />
              {/* <PrivateRoute exact path="/home" component={HomePage} /> */}
              <PrivateRoute exact path="/home" component={HomePage2Code} />

              <Redirect to="/home" />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
  return true
}
