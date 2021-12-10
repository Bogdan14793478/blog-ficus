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

  const { comments, findPost } = useSelector((state) => state.post)

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
        <GeneralLogic comments={comments} postID={postID} />
      </div>
    </div>
  )
}
