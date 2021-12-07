import React from "react"
import { Grid } from "@mui/material"
import { CardComments } from "./CardComments"

export const GeneralList = ({ message, onSubmit, deleteComment }) => {
  return (
    <div>
      {message.map((item) => {
        return (
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: "10px", marginLeft: "20px", width: "1200px" }}
            style={{ marginTop: "10px", marginLeft: "30px" }}
            key={item._id}
          >
            <CardComments
              item={item}
              onSubmit={onSubmit}
              deleteComment={deleteComment}
            />
            {item.children.length > 0 && (
              <GeneralList
                message={item.children}
                item={item}
                onSubmit={onSubmit}
                deleteComment={deleteComment}
              />
            )}
          </Grid>
        )
      })}
    </div>
  )
}
