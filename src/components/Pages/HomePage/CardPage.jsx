/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
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
  actionpostPlusOrMinusLike,
  actionDeletePosts,
} from "../../../redux/actions/types"

export const MediaCard = ({ item, showAllPost, userId }) => {
  const countLikes = item?.likes?.length
  const dispatch = useDispatch()

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

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          width: 375,
          height: "14.8vh",
          marginLeft: "1vw",
          wordWrap: "break-word",
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

        <div className="group-img-like-updete-post">
          {item.image && (
            <CardMedia
              sx={{
                display: "flex",
              }}
            >
              <img
                src={`${process.env.REACT_APP_URL_SERVER_ADRESS}${item.image}`}
                className="image-post-homepage"
              />
            </CardMedia>
          )}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
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
          </CardActions>
        </div>
      </Card>
    </Grid>
  )
}
