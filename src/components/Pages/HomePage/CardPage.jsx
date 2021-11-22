/* eslint-disable react/jsx-no-duplicate-props */
import React from "react"
import { useDispatch } from "react-redux"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { deletePost, putLikePost, updatePost } from "../../../api/posts"
import { FormCreatePost } from "./FormCreatePost"
import { Labels } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import { actionpostPlusOrMinusLike } from "../../../redux/actions/types"

export const MediaCard = ({ item, showAllPost, userId }) => {
  const countLikes = item?.likes?.length
  const dispatch = useDispatch()
  const deleteSelectedPost = () => {
    dispatch(deletePost(item._id))
  }

  const putLikeSelectedPost = () => {
    const itemId = item._id
    putLikePost(itemId)
    dispatch(actionpostPlusOrMinusLike({ itemId, userId }))
  }

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          maxWidth: 345,
          marginLeft: "10px",
          marginTop: "10px",
          padding: "10px",
          wordWrap: "break-word",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-tittle-text"
        >
          {item.title}
          {showAllPost && (
            <DeleteIcon onClick={deleteSelectedPost} sx={{ marginLeft: "294px" }} />
          )}
        </Typography>
        {item.image && (
          <CardMedia
            component="img"
            height="140"
            image={`${process.env.REACT_APP_URL_SERVER_ADRESS}${item.image}`}
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="card-tittle-text"
          >
            {item.fullText}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={putLikeSelectedPost}>
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
      </Card>
    </Grid>
  )
}
