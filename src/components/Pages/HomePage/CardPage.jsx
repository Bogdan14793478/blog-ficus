/* eslint-disable react/jsx-no-duplicate-props */
import * as React from "react"
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
import CustomizedDialogs from "./ModalPageCreatePost"
import { FormCreatePost } from "./FormCreatePost"
import { Labels } from "../../../constantsName/constants"

export const MediaCard = ({ item, showAllPost, userId }) => {
  const dispatch = useDispatch()
  const deleteSelectedPost = () => {
    dispatch(deletePost(item._id))
  }

  const putLikeSelectedPost = () => {
    dispatch(putLikePost(item._id, userId, item._id))
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
          className="cardTittleText"
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
            image={`http://51.158.179.21${item.image}`}
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="cardTittleText"
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
          <Button
            style={{ backgroundColor: "transparent" }}
            size="small"
            onClick={putLikeSelectedPost}
          >
            {Labels.buttonLike} {item?.likes?.length}
          </Button>
          {showAllPost && (
            <CustomizedDialogs
              buttonName={Labels.updatePost}
              buttonNameOnForm={Labels.updatePostinForm}
            >
              <FormCreatePost typeAxiosParam={updatePost} postId={item._id} />
            </CustomizedDialogs>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}
