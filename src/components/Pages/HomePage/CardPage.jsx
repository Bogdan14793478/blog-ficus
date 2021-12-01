/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { debounce } from "debounce"
import {
  deletePost,
  putLikePost,
  updatePost,
  showChoosePostInfo,
  loadAllCommentsForPost,
} from "../../../api/posts"
import { FormCreatePost } from "./FormCreatePost"
import { Labels } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import {
  actionpostPlusOrMinusLike,
  actionDeletePosts,
} from "../../../redux/actions/types"
import { Table } from "./Table"

export const MediaCard = ({ item, showAllPost, userId, findPost, comments }) => {
  const countLikes = item?.likes?.length
  const dispatch = useDispatch()
  const history = useHistory()

  const deleteSelectedPost = () => {
    deletePost(item._id)
    dispatch(actionDeletePosts(item._id))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceLikePost = useCallback(
    debounce((itemS) => putLikePost(item._id), 1000),
    []
  )

  const countPostLikes = (e) => {
    dispatch(actionpostPlusOrMinusLike({ itemId: item._id, userId }))
    debounceLikePost(e.target.value)
  }

  function redirectToComments() {
    history.push(`/comments/coment/${item._id}`)
  }

  const showInfoPost = () => {
    redirectToComments()
    dispatch(showChoosePostInfo(item._id))
    dispatch(loadAllCommentsForPost(item._id))
  }

  return (
    <Grid item xs={16} md={3}>
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
              {item.title}
            </Typography>
          </div>
          <div>{showAllPost && <DeleteIcon onClick={deleteSelectedPost} />}</div>
        </div>
        <div>
          {item.image && (
            <CardMedia
              sx={{
                display: "flex",
                maxHeight: "60px",
              }}
            >
              <img
                src={`${process.env.REACT_APP_URL_SERVER_ADRESS}${item.image}`}
                className="image-post-homepage"
              />
            </CardMedia>
          )}
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <div className="group-like-updete-post">
          <CardActions>
            <Button size="small" onClick={countPostLikes}>
              {Labels.buttonLike} {countLikes}
            </Button>

            {showAllPost && (
              <ModalProvider
                buttonName={Labels.updatePost}
                buttonNameOnForm={Labels.updatePostinForm}
              >
                <FormCreatePost onSubmitPost={updatePost} postId={item._id} />
              </ModalProvider>
            )}
            <ModalProvider buttonName="Show info" takeInfo={showInfoPost} />
          </CardActions>
        </div>
      </Card>
    </Grid>
  )
}
