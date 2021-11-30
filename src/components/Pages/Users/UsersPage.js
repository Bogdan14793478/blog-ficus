/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-default-export */
import React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { useDispatch } from "react-redux"
import { actionShowChooseUser } from "../../../redux/actions/types"
import { Labels, UrlAdress } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import { Table } from "./Table"

export const MediaCard = ({ item, itemId, findUser }) => {
  const dispatch = useDispatch()
  const showChooseUserInfo = () => {
    dispatch(actionShowChooseUser(itemId))
  }
  const takeInfoUser = () => {
    showChooseUserInfo()
  }

  return (
    <Card
      sx={{
        width: 380,
        padding: "10px",
        marginLeft: "30px",
        paddingTop: "3px",
        marginBottom: "20px",
      }}
    >
      <Typography gutterBottom variant="h7" component="div">
        {item.name}
      </Typography>
      <ModalProvider
        buttonName={Labels.buttonUserInform}
        buttonNameOnForm="Info choose user"
        takeInfo={takeInfoUser}
      >
        <Table findUser={findUser} />
      </ModalProvider>

      <Typography gutterBottom variant="h7" component="div">
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
