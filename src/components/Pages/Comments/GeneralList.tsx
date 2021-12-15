import React from "react"
import { Grid } from "@mui/material"
import { CardComments } from "./CardComments"

type StrValues = {
  commentedBy: string | undefined
  followedCommentID: string | null
  numberPostID: string
  text: string
  _id: string
}
interface ObjectComment extends StrValues {
  children?: ObjectComment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
}

type PropsType = {
  message: ObjectComment[]
  onSubmit: (values: StrValues, props: any) => void
  deleteComment: (postId: string, followedCommentId: string | null) => void
  userId: string
  plusOrMinusLike: (
    commentedBy: string | undefined,
    itemId: string,
    followedCommentId: string | null
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
            {item.children !== undefined && item.children.length > 0 && (
              <GeneralList
                userId={userId}
                message={item.children}
                // item={item}
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
