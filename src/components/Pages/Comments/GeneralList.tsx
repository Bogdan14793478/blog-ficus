import React from "react"
import { Grid } from "@mui/material"
import { FormikHelpers } from "formik"
import { CardComments } from "./CardComments"
import { Comment } from "../../../redux/actions/interface"

type PropsType = {
  message: Comment[]
  onSubmit: (values: Comment, props: FormikHelpers<Comment>) => void
  updateComment: (values: Comment, props: FormikHelpers<Comment>) => void
  deleteComment: (postId: string, followedCommentId: string | null) => void
  userId: string
  plusOrMinusLike: (
    itemId: string,
    followedCommentId: string | null,
    commentedBy?: string
  ) => void
  postID: string
}

export const GeneralList: React.FC<PropsType> = ({
  postID,
  message,
  onSubmit,
  updateComment,
  deleteComment,
  userId,
  plusOrMinusLike,
}) => {
  return (
    <div>
      {message.map(item => {
        return (
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: "10px", marginLeft: "20px", width: "1200px" }}
            style={{ marginTop: "10px", marginLeft: "30px" }}
            key={item._id}
          >
            <CardComments
              userId={userId}
              item={item}
              onSubmit={onSubmit}
              updateComment={updateComment}
              deleteComment={deleteComment}
              plusOrMinusLike={plusOrMinusLike}
              postID={postID}
            />
            {item.children && (
              <GeneralList
                userId={userId}
                message={item.children}
                onSubmit={onSubmit}
                updateComment={updateComment}
                deleteComment={deleteComment}
                plusOrMinusLike={plusOrMinusLike}
                postID={postID}
              />
            )}
          </Grid>
        )
      })}
    </div>
  )
}
