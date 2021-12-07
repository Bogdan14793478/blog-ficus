import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Table } from "../HomePage/Table"
import { showChoosePostInfo, loadAllCommentsForPost } from "../../../api/posts"
import { GeneralLogic } from "./GeneralLogic"
import "./CommentsPage.css"

export const CommentsPage = () => {
  const { postID } = useParams()
  const dispatch = useDispatch()

  const { comments } = useSelector((state) => state.post)
  const { findPost } = useSelector((state) => state.auth)

  const tokenUser = localStorage.getItem("passport")

  function parseJwt(token) {
    // from jwt-key take info about user
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          // eslint-disable-next-line prefer-template
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    )
    return JSON.parse(jsonPayload)
  }
  const userId = parseJwt(tokenUser).user._id

  useEffect(() => {
    dispatch(showChoosePostInfo(postID))
    dispatch(loadAllCommentsForPost(postID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <h6 className="app-wrapper-setting">Comments page</h6>
      <div className="comments-table">
        <Table findPost={findPost} />
        <GeneralLogic comments={comments} userId={userId} postID={postID} />
      </div>
    </div>
  )
}
