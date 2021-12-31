import React from "react"
import { Tableheader } from "../../../constantsName/constants"
import { AllGetAllUser } from "../../../redux/actions/interface"

type Props = {
  findUser: AllGetAllUser | null
}
export const Table: React.FC<Props> = ({ findUser }) => {
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
            <td>{findUser?._id}</td>
            <td>{findUser?.name || "no inform"}</td>
            <td>{findUser?.email}</td>
            <td>{findUser?.dateCreated}</td>
            <td>{findUser?.skills || "no inform"}</td>
            <td>{findUser?.profession || "no inform"}</td>
            <td>{findUser?.details || "no inform"}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
