import React from "react"
import { Grid } from "@mui/material"
import { MediaCardComments } from "./CommentsPage"

export const GeneralList = ({
  message,
  userId,
  postID,
  initialValues,
  onSubmit,
  followedCommentIDL,
  setFfollowedCommentID,
  setNumberPostID,
  deleteComment,
}) => {
  return (
    <div>
      {message.map((item) => {
        return (
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: "10px", marginLeft: "20px", width: "1200px" }}
            style={{ marginTop: "20px", marginLeft: "30px" }}
            key={item._id}
          >
            <MediaCardComments
              postID={postID}
              item={item}
              userId={userId}
              initialValues={initialValues}
              onSubmit={onSubmit}
              followedCommentIDL={followedCommentIDL}
              setFfollowedCommentID={setFfollowedCommentID}
              setNumberPostID={setNumberPostID}
              deleteComment={deleteComment}
            />
            {item.children.length > 0 && (
              <GeneralList
                postID={postID}
                message={item.children}
                item={item}
                userId={userId}
                initialValues={initialValues}
                onSubmit={onSubmit}
                setFfollowedCommentID={setFfollowedCommentID}
                setNumberPostID={setNumberPostID}
                deleteComment={deleteComment}
              />
            )}
          </Grid>
        )
      })}
    </div>
  )
}
