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
import { deletePost, updatePost } from "../../../api/posts"
import CustomizedDialogs from "./ModalPageCreatePost"
import { FormCreatePost } from "./FormCreatePost"

export const MediaCard = ({ item, showAllPost }) => {
  const [flag, setFlag] = React.useState(false)
  const dispatch = useDispatch()
  const buttonName = "Update post"
  const buttonNameOnForm = "Correct your post"
  const idPost = item._id
  const onClickDeletePost = () => {
    dispatch(deletePost(item._id))
  }
  const onClick = () => {
    setFlag(true)
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
            <DeleteIcon onClick={onClickDeletePost} sx={{ marginLeft: "294px" }} />
          )}
        </Typography>
        {/* <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={item.image}
        /> */}
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
          <Button size="small">Like {item?.likes?.length}</Button>
          {showAllPost && (
            <Button size="small" onClick={onClick}>
              Update post?
            </Button>
          )}
          {flag && (
            <CustomizedDialogs
              buttonName={buttonName}
              buttonNameOnForm={buttonNameOnForm}
            >
              <FormCreatePost typeAxiosParam={updatePost} idPost={idPost} />
            </CustomizedDialogs>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}
