import React from "react"
import { Labels } from "../../../constantsName/constants"

export const Table = ({
  id,
  name,
  informUser,
  dateCreated,
  skills,
  profession,
  details,
}) => {
  return (
    <>
      <table className="table-setting">
        <thead>
          <tr>
            <th>User id</th>
            <th>Name</th>
            <th>User email</th>
            <th>Date create account</th>
            <th>Skills</th>
            <th>Profession</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{name ? <>{name}</> : "no inform"}</td>
            <td>{informUser}</td>
            <td>{dateCreated}</td>
            <td>{skills ? <>{skills}</> : "no inform"}</td>
            <td>{profession ? <>{profession}</> : "no inform"}</td>
            <td>{details ? <>{details}</> : "no inform"}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
