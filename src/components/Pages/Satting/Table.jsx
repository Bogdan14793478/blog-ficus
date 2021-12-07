import React from "react"
import { Tableheader } from "../../../constantsName/constants"

export const Table = ({
  id,
  name,
  email,
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
            <th>{Tableheader.userId}</th>
            <th>{Tableheader.name}</th>
            <th>{Tableheader.userEmail}</th>
            <th>{Tableheader.dataCreate}</th>
            <th>{Tableheader.skill}</th>
            <th>{Tableheader.proffesion}</th>
            <th>{Tableheader.details}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>{name || "no inform"}</td>
            <td>{email}</td>
            <td>{dateCreated}</td>
            <td>{skills || "no inform"}</td>
            <td>{profession || "no inform"}</td>
            <td>{details || "no inform"}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
