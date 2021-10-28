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

export const MediaCard = ({ item }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.posts)

  const id = item._id

  const onClickDeletePost = () => {
    dispatch(deletePost(id))
  }
  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          maxWidth: 345,
          marginLeft: "10px",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
          <DeleteIcon
            onClick={onClickDeletePost}
            sx={{ marginLeft: "200px", marginTop: "10px" }}
          />
        </Typography>
        {/* <CardMedia component="img" height="140" image={item.poster} alt="nature" /> */}
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
