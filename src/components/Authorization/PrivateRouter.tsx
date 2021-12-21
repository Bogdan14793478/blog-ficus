/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom"
import { Labels } from "../../constantsName/constants"

type Props = RouteProps & { component: React.Component<RouteComponentProps> }

export const PrivateRoute: React.FC<Props> = ({
  component: Component,
  path,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem(Labels.token)

  return (
    <Route
      {...rest}
      path={path}
      render={routerProps =>
        isAuthenticated ? <Component {...routerProps} /> : <Redirect to="/login" />
      }
    />
  )
}
