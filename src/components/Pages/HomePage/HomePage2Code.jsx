/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Fab, Grid, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { MediaCard } from "./CardPage"
import { createNewPost, getAllPosts } from "../../../api/posts"
import { actionGetCurrentPage } from "../../../redux/actions/types"
import { createNumberPages } from "../../../hooks/countPages"

export const HomePage2Code = () => {
  const dispatch = useDispatch()
  const { totalCount, perPage, currentPage, posts } = useSelector(
    (state) => state.post
  )
  // const posts = useSelector((state) => state.post.posts)
  // const totalCount = useSelector((state) => state.post.totalCount)
  // const perPage = useSelector((state) => state.post.perPage)
  // const currentPage = useSelector((state) => state.post.currentPage)
  const [searchValue, setSearchValue] = useState("")

  const [title, setTitle] = useState("")
  const [fullText, setShortText] = useState("")
  const [description, setLongText] = useState("")
  const id = Date.now()
  const pagesCount = Math.ceil(totalCount / perPage)
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  createNumberPages(pages, pagesCount, currentPage)

  function startGetAllPost() {
    getAllPosts()
  }

  const loadAllpost = () => {
    startGetAllPost()
  }

  const clickCreateNewPost = () => {
    dispatch(createNewPost({ title, fullText, description }))
    setTitle("")
    setShortText("")
    setLongText("")
  }

  useEffect(() => {
    dispatch(getAllPosts(searchValue, currentPage, perPage))
  }, [searchValue, dispatch, currentPage, perPage])

  return (
    <div>
      <h4>Home Page</h4>
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
          value={fullText}
          variant="standard"
          sx={{ width: "300px", marginLeft: "20px" }}
          onChange={(event) => {
            setShortText(event.target.value)
          }}
        />
        <TextField
          id="standard-basic"
          label="Add new post"
          value={description}
          variant="standard"
          sx={{ width: "300px", marginLeft: "20px" }}
          onChange={(event) => {
            setLongText(event.target.value)
          }}
        />
        <Fab color="primary" aria-label="edit">
          <AddCircleIcon onClick={clickCreateNewPost} sx={{ fontSize: "big" }} />
        </Fab>
        <Fab color="primary" aria-label="edit">
          <AddCircleIcon onClick={loadAllpost} sx={{ fontSize: "big" }} />
        </Fab>
      </form>
      <Grid container spacing={2}>
        {posts?.map((item) => (
          <MediaCard key={item._id} item={item} />
        ))}
      </Grid>
      {/* <Fab color="primary" aria-label="edit">
        <AddCircleIcon onClick={loadMorePosts} sx={{ fontSize: "big" }} />
      </Fab> загрузить более */}
      <div className="pages">
        {pages.map((page, i) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`page-${i}`}
            className={currentPage === page ? "current-page" : "page"}
            onClick={() => dispatch(actionGetCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  )
}
