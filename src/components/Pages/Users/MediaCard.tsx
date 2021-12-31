import React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"
import { useDispatch } from "react-redux"
import { actionShowChooseUser } from "../../../redux/actions/typeActionUser"
import { Labels, UrlAdress } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import { Table } from "./Table"
import { AllGetAllUser } from "../../../redux/actions/interface"

type Props = {
  item: AllGetAllUser
  itemId: string
  findUser: AllGetAllUser | null
}
export const MediaCard: React.FC<Props> = ({ item, itemId, findUser }) => {
  const dispatch = useDispatch()
  const showChooseUserInfo = () => {
    dispatch(actionShowChooseUser(itemId))
  }
  const takeInfoUser = () => {
    showChooseUserInfo()
  }

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          margin: " 0 5px",
        }}
      >
        <div className="group-title-deleteicon-card">
          <Typography gutterBottom variant="h6" component="div">
            {item.name}
          </Typography>
          <ModalProvider
            buttonName={Labels.buttonUserInform}
            buttonNameOnForm="Info choose user"
            takeInfo={takeInfoUser}
          >
            <Table findUser={findUser} />
          </ModalProvider>
        </div>
        <div className="group-email-profession">
          <Typography gutterBottom variant="h6" component="div">
            {item.email},{item.profession},
          </Typography>
        </div>
        <div className="avatar-user-user-page">
          {item.avatar && (
            <CardMedia
              sx={{
                display: "flex",
              }}
            >
              <img
                src={`${UrlAdress.urlPageServer}${item.avatar}`}
                className="image-post-homepage"
                alt=""
              />
            </CardMedia>
          )}
        </div>
      </Card>
    </Grid>
  )
}
