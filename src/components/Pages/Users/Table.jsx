/* eslint-disable react/button-has-type */
import React from "react"
import { Labels } from "../../../constantsName/constants"

export const Table = ({ findUser }) => {
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
            <td>{findUser._id}</td>
            <td>{findUser.name || "no inform"}</td>
            <td>{findUser.email}</td>
            <td>{findUser.dateCreated}</td>
            <td>{findUser.skills || "no inform"}</td>
            <td>{findUser.profession || "no inform"}</td>
            <td>{findUser.details || "no inform"}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
