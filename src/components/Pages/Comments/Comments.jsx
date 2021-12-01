import { Grid } from "@mui/material"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Table } from "../HomePage/Table"
import { MediaCardComments } from "./CommentsPage"
import { showChoosePostInfo, loadAllCommentsForPost } from "../../../api/posts"

export const Comments = () => {
  const { page } = useParams()
  const dispatch = useDispatch()
  const { findPost, comments } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(showChoosePostInfo(page))
    dispatch(loadAllCommentsForPost(page))
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
      </div>
    </div>
  )
}
