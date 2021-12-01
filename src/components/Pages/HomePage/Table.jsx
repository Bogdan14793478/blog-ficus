import React from "react"
import { Tableheader } from "../../../constantsName/constants"

export const Table = ({ findPost, comments }) => {
  return (
    <>
      <table className="table-setting">
        <thead>
          <tr>
            <th>{Tableheader.posrId}</th>
            <th>{Tableheader.title}</th>
            <th>{Tableheader.dataCreatePost}</th>
            <th>{Tableheader.fullPostText}</th>
            <th>{Tableheader.descriptions}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{findPost._id}</td>
            <td>{findPost.title || "no inform"}</td>
            <td>{findPost.dateCreated}</td>
            <td>{findPost.fullText || "no inform"}</td>
            <td>{findPost.description || "no inform"}</td>
          </tr>
        </tbody>
      </table>
      {/* <h6>Coments for post:</h6>
      <table className="table-setting">
        <thead>
          <tr>
            <th>User id</th>
            <th>likes</th>
            <th>text</th>
          </tr>
        </thead>
        {comments &&
          comments.map((commit) => (
            <tbody key={commit._id}>
              <tr>
                <td>{commit._id}</td>
                <td>{commit.likes.length}</td>
                <td>{commit.text}</td>
              </tr>
            </tbody>
          ))}{" "}
      </table> */}
    </>
  )
}
