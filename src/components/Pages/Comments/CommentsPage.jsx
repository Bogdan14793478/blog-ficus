/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ReplyIcon from "@mui/icons-material/Reply"
import { debounce } from "debounce"
import { deletePost, putLikeCommit, updatePost } from "../../../api/posts"
import { Labels } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import {
  actionCommentPlusOrMinusLike,
  actionDeletePosts,
} from "../../../redux/actions/types"
import { FormCreateCommit } from "./FormCreateCommit"

export const MediaCardComments = ({ item }) => {
  const { page } = useParams()
  const countLikes = item?.likes?.length
  const dispatch = useDispatch()

  const deleteSelectedPost = () => {}

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
  // console.log(typeof item.followedCommentID, "item.followedCommentID")
  return (
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
              User id: {item._id}
            </Typography>
          </div>
          <div>
            <DeleteIcon onClick={deleteSelectedPost} />
          </div>
        </div>
        <div className="info-post-coments">
          <p> commented: {item.commentedBy}</p>
          <p>followed: {item.followedCommentID}</p>
          <p>postId: {item.postID}</p>
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
          <Button size="small" onClick={countCommentLikes}>
            <ReplyIcon />
          </Button>
        </div>
      </Card>
    </Grid>
  )
}
