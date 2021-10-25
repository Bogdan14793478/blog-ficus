import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Fab, Grid, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { MediaCard } from "./CardPage"

export const HomePage2Code = () => {
  const arr = [
    {
      name: "Bogdan",
      title: 28,
      id: 1,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Andrey",
      title: 29,
      id: 2,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Alexey",
      title: 27,
      id: 3,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Bogdan",
      title: 28,
      id: 4,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Andrey",
      title: 29,
      id: 5,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Alexey",
      title: 27,
      id: 6,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Bogdan",
      title: 28,
      id: 7,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Andrey",
      title: 29,
      id: 8,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
    {
      name: "Alexey",
      title: 27,
      id: 9,
      poster:
        "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
    },
  ]

  const [title, setTitle] = useState("")
  const [shortText, setShortText] = useState("")
  const [longText, setLongText] = useState("")
  const id = Date.now()

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.post.posts)
  //   const [loading, setLoading] = useState(false)
  const onClick = () => {
    // setLoading(true)
    dispatch(
      {
        type: "CREATE_NEW_POST",
        payload: [
          title,
          shortText,
          longText,
          id,
          //   parentId: userId
        ],
      },
      //   setLoading(false),
      setTitle(""),
      setShortText(""),
      setLongText("")
    )
  }
  //   if (loading) {
  //     return <h1>Loadingggg</h1>
  //   }

  return (
    <div>
      <h4>Home Page</h4>
      {posts}
      <form>
        <TextField
          id="standard-basic"
          label="Enter post title"
          value={title}
          variant="standard"
          sx={{ width: "300px", marginLeft: "20px" }}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <TextField
          id="standard-basic"
          label="Enter post text"
          value={shortText}
          variant="standard"
          sx={{ width: "300px", marginLeft: "20px" }}
          onChange={(event) => {
            setShortText(event.target.value)
          }}
        />
        <TextField
          id="standard-basic"
          label="Add new post"
          value={longText}
          variant="standard"
          sx={{ width: "300px", marginLeft: "20px" }}
          onChange={(event) => {
            setLongText(event.target.value)
          }}
        />
        <Fab color="primary" aria-label="addSmall">
          <AddCircleIcon onClick={onClick} sx={{ fontSize: "small" }} />
        </Fab>
      </form>

      <Grid container spacing={2}>
        {posts.map((item) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <MediaCard key={item.id} item={item} />
        ))}
      </Grid>
    </div>
  )
}
