/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ component: Component, path, props, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("passport")

  return (
    <Route
      {...rest}
      path={path}
      render={(routerProps) =>
        isAuthenticated ? <Component {...routerProps} /> : <Redirect to="/login" />
      }
    />
  )
}
