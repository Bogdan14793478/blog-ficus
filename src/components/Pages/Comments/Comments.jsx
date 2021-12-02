import { Grid } from "@mui/material"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Table } from "../HomePage/Table"
import { MediaCardComments } from "./CommentsPage"
import { showChoosePostInfo, loadAllCommentsForPost } from "../../../api/posts"
import { FormCreateCommit } from "./FormCreateCommit"
import { showInfoUser } from "../../../api/usersAxios"

export const Comments = () => {
  const { page } = useParams()
  const dispatch = useDispatch()
  const userID = localStorage.getItem("userId")

  const { comments, findPost } = useSelector((state) => state.post)
  const { _id } = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(showChoosePostInfo(page))
    dispatch(loadAllCommentsForPost(page))
    dispatch(showInfoUser(userID))
    console.log("Useefect")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <h7 className="app-wrapper-setting">Comments page</h7>
      <div className="comments-table">
        <Table findPost={findPost} comments={comments} />
        {comments && (
          <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
            {comments.map((item) => (
              <MediaCardComments key={item._id} item={item} comments={comments} />
            ))}
          </Grid>
        )}
        <FormCreateCommit comments={comments} userId={_id} page={page} />
      </div>
    </div>
  )
}
