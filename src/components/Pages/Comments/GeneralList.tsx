import React from "react"
import { Grid } from "@mui/material"
import { CardComments } from "./CardComments"
import { ParamValues, ObjectComment } from "../../Authorization/type"

type PropsType = {
  message: ObjectComment[]
  onSubmit: (values: ParamValues, props: any) => void
  deleteComment: (postId: string, followedCommentId: string | null) => void
  userId: string
  plusOrMinusLike: (
    itemId: string,
    followedCommentId: string | null,
    commentedBy?: string
  ) => void
}

export const GeneralList: React.FC<PropsType> = ({
  message,
  onSubmit,
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
              deleteComment={deleteComment}
              plusOrMinusLike={plusOrMinusLike}
              postID=""
            />
            {item.children && (
              <GeneralList
                userId={userId}
                message={item.children}
                onSubmit={onSubmit}
                deleteComment={deleteComment}
                plusOrMinusLike={plusOrMinusLike}
              />
            )}
          </Grid>
        )
      })}
    </div>
  )
}
