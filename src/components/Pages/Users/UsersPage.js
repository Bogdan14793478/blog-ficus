/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-default-export */
import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Labels, UrlAdress } from "../../../constantsName/constants"

export default function MediaCard({ item }) {
  return (
    <Card
      sx={{
        width: 345,
        maxHeight: "16.8vh",
        padding: "10px",
        marginLeft: "55px",
        paddingTop: "10px",
        marginBottom: "20px",
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        {item.name}
      </Typography>
      {item.avatar && (
        <CardMedia
          component="img"
          height="140"
          image={`${UrlAdress.urlPageServer}${item.avatar}`}
        />
      )}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.email}, {item.profession},
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{Labels.buttonUserInform}</Button>
      </CardActions>
    </Card>
  )
}
