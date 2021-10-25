import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Grid } from "@mui/material"

export const MediaCard = ({ item }) => {
  // console.log(item, "item")
  return (
    <Grid item xs="12" md="4">
      <Card sx={{ maxWidth: 345 }}>
        {/* <Typography gutterBottom variant="h5" component="div">
          {item.name} тут должен быть автор поста
        </Typography> */}
        <CardMedia component="img" height="140" image={item.poster} alt="nature" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Like</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
