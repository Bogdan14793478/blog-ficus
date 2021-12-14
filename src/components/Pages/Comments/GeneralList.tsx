import React from "react"
import { Grid } from "@mui/material"
import { CardComments } from "./CardComments"

type ObjectComments = {
  _id: string
  children: null | ObjectComments[] // ???
  commentedBy: string
  dateCreated: string
  followedCommentID: null | string
  likes: null | Array<string> // ????
  postID: string
  text: string
  __v: number
}

type PropsType = {
  message: ObjectComments[]
  onSubmit: () => {}
  deleteComment: () => {}
  userId: string
  plusOrMinusLike: () => {}
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
            />
            {item.children.length > 0 && (
              <GeneralList
                userId={userId}
                message={item.children}
                item={item}
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
