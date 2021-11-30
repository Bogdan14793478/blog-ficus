import React from "react"
import { Tableheader } from "../../../constantsName/constants"

export const Table = ({ findPost }) => {
  return (
    <>
      <table className="table-setting">
        <thead>
          <tr>
            <th>{Tableheader.posrId}</th>
            <th>{Tableheader.title}</th>
            <th>{Tableheader.dataCreatePost}</th>
            <th>{Tableheader.fullPostText}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{findPost._id}</td>
            <td>{findPost.title || "no inform"}</td>
            <td>{findPost.dateCreated}</td>
            <td>{findPost.fullText || "no inform"}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
