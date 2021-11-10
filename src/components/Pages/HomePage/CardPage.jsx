import * as React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { deletePost, putLikePost, updatePost } from "../../../api/posts"
import CustomizedDialogs from "./ModalPageCreatePost"
import { FormCreatePost } from "./FormCreatePost"
import {
  cardPageButtonName,
  cardPageButtonNameOnForm,
} from "../../../constantsName/constantsName"

export const MediaCard = ({ item, showAllPost, idUser }) => {
  const [flagUpdatePost, setFlag] = useState(false)

  const dispatch = useDispatch()
  const onClickDeletePost = () => {
    dispatch(deletePost(item._id))
  }
  const onClick = () => {
    setFlag(true)
  }

  const onClickPutLikePost = () => {
    dispatch(putLikePost(item._id, idUser, item._id))
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
          <Button size="small" onClick={onClickPutLikePost}>
            Like {item?.likes?.length}
          </Button>
          {showAllPost && (
            <Button size="small" onClick={onClick}>
              Update post?
            </Button>
          )}
          {flagUpdatePost && (
            <CustomizedDialogs
              buttonName={cardPageButtonName}
              buttonNameOnForm={cardPageButtonNameOnForm}
            >
              <FormCreatePost typeAxiosParam={updatePost} idPost={item._id} />
            </CustomizedDialogs>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}
