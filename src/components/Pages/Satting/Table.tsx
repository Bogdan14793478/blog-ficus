import React from "react"
import { Tableheader } from "../../../constantsName/constants"

type Props = {
  id?: string
  name?: string
  dateCreated?: string
  skills?: string
  profession?: string
  details?: string
}
export const Table: React.FC<Props> = ({
  id,
  name,
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
