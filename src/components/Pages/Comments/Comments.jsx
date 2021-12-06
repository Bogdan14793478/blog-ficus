import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Table } from "../HomePage/Table"
import { showChoosePostInfo, loadAllCommentsForPost } from "../../../api/posts"
import { showInfoUser } from "../../../api/usersAxios"
import { GeneralLogic } from "./GeneralLogic"

export const Comments = () => {
  const { page } = useParams()
  const dispatch = useDispatch()
  const userID = localStorage.getItem("userId")

  const { comments, findPost } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(showChoosePostInfo(page))
    dispatch(loadAllCommentsForPost(page))
    dispatch(showInfoUser(userID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <h6 className="app-wrapper-setting">Comments page</h6>
      <div className="comments-table">
        <Table findPost={findPost} />
        <GeneralLogic comments={comments} userId={userID} postID={page} />
      </div>
    </div>
  )
}
