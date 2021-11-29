/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-default-export */
import * as React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useDispatch } from "react-redux"
import { actionShowChooseUser } from "../../../redux/actions/types"
import { Labels, UrlAdress } from "../../../constantsName/constants"

// showInfoChooseUser
export const MediaCard = ({ item, itemId, setUserModalOpen }) => {
  const dispatch = useDispatch()
  const showChooseUserInfo = () => {
    dispatch(actionShowChooseUser(itemId))
  }
  const takeInfoUser = () => {
    showChooseUserInfo()
    setUserModalOpen(true)
  }

  return (
    <Card
      sx={{
        width: 380,
        maxHeight: "17.8vh",
        padding: "10px",
        marginLeft: "30px",
        paddingTop: "3px",
        marginBottom: "20px",
      }}
    >
      <Typography gutterBottom variant="h7" component="div">
        {item.name}
      </Typography>
      <Button size="small" onClick={takeInfoUser}>
        {Labels.buttonUserInform}
      </Button>
      <Typography gutterBottom variant="h5" component="div">
        {item.email}, {item.profession},
      </Typography>
      {item.avatar && (
        <CardMedia
          sx={{
            display: "flex",
          }}
        >
          <img
            src={`${UrlAdress.urlPageServer}${item.avatar}`}
            className="image-post-homepage"
          />
        </CardMedia>
      )}
    </Card>
  )
}
