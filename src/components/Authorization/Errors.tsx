import { FormikErrors } from "formik"
import React from "react"
import { Labels } from "../../constantsName/constants"
import "./Login.css"
import { Comment } from "../../redux/actions/interface"

interface Props {
  errors: Record<string, string | FormikErrors<Comment>[]>
}

export const Errors: React.FC<Props> = ({ errors }) => {
  return (
    <ul className="error-component">
      {Object.entries(errors).map(([key, error]) => {
        return (
          <li key={key}>
            {Labels.errorPage} {key}: {error}
          </li>
        )
      })}
    </ul>
  )
}
