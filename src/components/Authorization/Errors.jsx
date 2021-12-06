import React from "react"
import { Labels } from "../../constantsName/constants"
import "./Login.css"

export function Errors({ errors }) {
  return Object.entries(errors).map(([key, error]) => {
    return (
      <ul key={key} className="error-component">
        <li>
          {Labels.errorPage} {key}: {error}
        </li>
      </ul>
    )
  })
}
