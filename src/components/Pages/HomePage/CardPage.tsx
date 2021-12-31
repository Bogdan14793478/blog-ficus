/* eslint-disable jsx-a11y/alt-text */
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
import { deletePost, putLikePost, updatePost } from "../../../api/posts"
import { FormCreatePost } from "./FormCreatePost"
import { Labels } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import {
  actionDeletePosts,
  actionpostPlusOrMinusLike,
} from "../../../redux/actions/typeActionPost"
import { Posts } from "../../../redux/reducers/post"

type Props = {
  item: Posts
  showAllPost: boolean
  userId?: string
}
export const MediaCard: React.FC<Props> = ({ item, showAllPost, userId }) => {
  const countLikes = item?.likes?.length
  const dispatch = useDispatch()
  const history = useHistory()
  const deleteSelectedPost = (): void => {
    deletePost(item._id)
    dispatch(actionDeletePosts(item._id))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceLikePost = useCallback(
    debounce(() => putLikePost(item._id), 1000),
    []
  )

  const countPostLikes = (): void => {
    dispatch(actionpostPlusOrMinusLike({ itemId: item._id, userId }))
    debounceLikePost()
  }

  function redirectToComments(): void {
    history.push(`/comments/${item._id}`)
  }

  const showInfoPost = (): void => {
    redirectToComments()
  }

  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{
          margin: " 0 5px",
          height: "201px",
          position: "relative",
          opacity: "1",
        }}
      >
        <div className="group-title-deleteicon-card">
          <div>
            <Typography
              gutterBottom
              variant="h6"
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
          <Typography
            variant="body2"
            color="text.secondary"
            className="description-home-post"
          >
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
            <ModalProvider
              buttonName="Show info"
              buttonNameOnForm="info"
              takeInfo={showInfoPost}
            />
          </CardActions>
        </div>
      </Card>
    </Grid>
  )
}
