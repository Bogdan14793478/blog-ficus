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
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{name ? <td>${name}</td> : "no inform"}</td>
            <td>{informUser}</td>
            <td>{dateCreated}</td>
            <td>{skills ? <td>${skills}</td> : "no inform"}</td>
            <td>{profession ? <td>${profession}</td> : "no inform"}</td>
            <td>{details ? <td>${details}</td> : "no inform"}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
