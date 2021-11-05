import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { deletePost } from "../../../api/posts"

export const MediaCard = ({ item, ShowAllPost }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.posts)
  const onClickDeletePost = () => {
    dispatch(deletePost(item._id))
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
          {ShowAllPost ? (
            <DeleteIcon onClick={onClickDeletePost} sx={{ marginLeft: "294px" }} />
          ) : (
            ""
          )}
        </Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.fullText}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Like {item?.likes?.length}</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
