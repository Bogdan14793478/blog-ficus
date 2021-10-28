// import React, { useState } from "react"
// import { useDispatch } from "react-redux"
// import { Fab, Grid, TextField } from "@mui/material"
// import AddCircleIcon from "@mui/icons-material/AddCircle"
// import { MediaCard } from "./CardPage"
// import { userPosts } from "../../../redux/redusers/post"

// export const HomePage = () => {
//   const arr = [
//     {
//       name: "Bogdan",
//       title: 28,
//       id: 1,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Andrey",
//       title: 29,
//       id: 2,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Alexey",
//       title: 27,
//       id: 3,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Bogdan",
//       title: 28,
//       id: 4,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Andrey",
//       title: 29,
//       id: 5,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Alexey",
//       title: 27,
//       id: 6,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Bogdan",
//       title: 28,
//       id: 7,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Andrey",
//       title: 29,
//       id: 8,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//     {
//       name: "Alexey",
//       title: 27,
//       id: 9,
//       poster:
//         "https://cdn.pixabay.com/photo/2018/10/13/20/15/man-3745031_960_720.jpg",
//     },
//   ]

//   const [post, setPost] = useState({
//     title: "",
//     shortText: "",
//     longText: "",
//   })

//   const dispatch = useDispatch()

//   const handleChange = (e) => {
//     const { value } = e.target
//     console.log(post, " setPost")
//     setPost({…post,  [e.target.name]: value}) //!!!
//   }
//   const saveNewPost = () => {
//     dispatch({
//       type: "CREATE_NEW_POST",
//       payload: {
//         post,
//       },
//     })
//   }

//   return (
//     <div>
//       <h4>Home Page</h4>
//       <form>
//         <TextField
//           id="standard-basic"
//           label="Enter post title"
//           value={post.title}
//           variant="standard"
//           sx={{ width: "300px", marginLeft: "20px" }}
//           onChange={handleChange}
//         />
//         <TextField
//           id="standard-basic"
//           label="Enter post text"
//           value={post.shortText}
//           variant="standard"
//           sx={{ width: "300px", marginLeft: "20px" }}
//           onChange={handleChange}
//         />
//         <TextField
//           id="standard-basic"
//           label="Add new post"
//           value={post.longText}
//           variant="standard"
//           sx={{ width: "300px", marginLeft: "20px" }}
//           onChange={handleChange}
//         />
//         <Fab color="primary" aria-label="addSmall">
//           <AddCircleIcon onClick={saveNewPost} sx={{ fontSize: "small" }} />
//         </Fab>
//       </form>

//       <Grid container spacing={2}>
//         {arr.map((item) => (
//           // eslint-disable-next-line react/jsx-props-no-spreading
//           <MediaCard key={item.id} item={item} />
//         ))}
//       </Grid>
//     </div>
//   )
// }
