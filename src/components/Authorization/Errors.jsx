import React from "react"

export function Errors({ errors }) {
  return Object.entries(errors).map(([key, error]) => {
    return (
      <ul key={key}>
        <li>
          error {key}: {error}
        </li>
      </ul>
    )
  })
}
