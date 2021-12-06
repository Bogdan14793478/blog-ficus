import React, { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
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
import { actionCommentPlusOrMinusLike } from "../../../redux/actions/types"
import { FormCreateCommit } from "./FormCreateCommit"

export const MediaCardComments = ({
  item,
  userId,
  postID,
  deleteComment,
  initialValues,
  onSubmit,
  followedCommentIDL,
  setNumberPostID,
  setFfollowedCommentID,
}) => {
  const [show, setShow] = useState(false)
  const countLikes = item?.likes?.length
  const dispatch = useDispatch()

  const deleteSelectedPost = () => {
    deleteComment(item._id, item.followedCommentID)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceLikePost = useCallback(
    debounce((itemS) => putLikeCommit(item._id), 1000),
    []
  )

  const countCommentLikes = (e) => {
    dispatch(
      actionCommentPlusOrMinusLike({ itemId: item.commentedBy, postId: item._id })
    )
    debounceLikePost(e.target.value)
  }

  const commitOnCommit = () => {
    setShow(!show)
    setNumberPostID(item._id)
    setFfollowedCommentID(item.followedCommentID)
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
                variant="h7"
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
            <p>followed: {item.followedCommentID || followedCommentIDL} </p>
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
        <FormCreateCommit initialValues={initialValues} onSubmit={onSubmit} />
      )}
    </>
  )
}
