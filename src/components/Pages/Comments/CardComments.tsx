import React, { useState, useCallback } from "react"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ReplyIcon from "@mui/icons-material/Reply"
import { debounce } from "debounce"
import { putLikeCommit } from "../../../api/posts"
import { Labels } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import { FormCreateComment } from "./FormCreateComent"

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
  item: ObjectComment
  postID: string
  deleteComment: (postId: string, followedCommentId: string | null) => void
  onSubmit: (values: StrValues, props: any) => void
  userId: string
  plusOrMinusLike: (
    commentedBy: string | undefined,
    itemId: string,
    followedCommentId: string | null
  ) => void
}

export const CardComments: React.FC<PropsType> = ({
  item,
  postID,
  deleteComment,
  onSubmit,
  userId,
  plusOrMinusLike,
}) => {
  const [show, setShow] = useState(false)
  const countLikes = item?.likes?.length

  const deleteSelectedPost = () => {
    deleteComment(item._id, item.followedCommentID)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceLikePost = useCallback(
    debounce(() => putLikeCommit(item._id), 1000),
    []
  )

  // const countCommentLikes = (e: React.FormEvent<HTMLButtonElement>): void => {
  const countCommentLikes = (): void => {
    plusOrMinusLike(item.commentedBy, item._id, item.followedCommentID)
    // debounceLikePost(e.target.value)
    debounceLikePost()
  }

  const commitOnCommit = () => {
    setShow(!show)
  }
  return (
    <>
      <Grid item xs={10} md={10}>
        <Card
          sx={{
            margin: " 0 5px",
            height: "201px",
            position: "relative",
          }}
        >
          <div className="group-title-deleteicon-card">
            <div>
              <Typography
                gutterBottom
                // variant="h7"
                component="div"
                className="card-tittle-text"
              >
                id coment: {item._id}
              </Typography>
            </div>
            <div>
              {userId === item.commentedBy && (
                <DeleteIcon onClick={deleteSelectedPost} />
              )}
            </div>
          </div>
          <div className="info-post-coments">
            <p> commented: {item.commentedBy || userId}</p>
            <p>followed: {item.followedCommentID || null} </p>
            <p>postId: {item.postID || postID}</p>
            <p>text: {item.text}</p>
          </div>

          <div className="group-like-updete-post">
            <Button size="small" onClick={countCommentLikes}>
              {Labels.buttonLike} {countLikes}
            </Button>
            <ModalProvider
              buttonName="Update comment"
              buttonNameOnForm="Correct your comment"
            />
            <Button size="small" onClick={commitOnCommit}>
              <ReplyIcon />
            </Button>
          </div>
        </Card>
      </Grid>
      {show && (
        <FormCreateComment
          onSubmit={onSubmit}
          commentId={item._id}
          followedCommentID={item._id}
          userId={userId}
        />
      )}
    </>
  )
}
