/* eslint-disable no-sequences */
/* eslint-disable prefer-spread */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Fab, Grid, Pagination, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { MediaCard } from "./CardPage"
import { Errors } from "../../Authorization/Errors"
import { createNewPost, getAllPosts } from "../../../api/posts"
import {
  actionGetCurrentPage,
  actionGetAllPosts,
} from "../../../redux/actions/types"
import { createPage } from "../../../utils/countPagination"

const initialValues = {
  title: "",
  fullText: "",
  description: "",
}
export const HomePage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  console.log(history, "history")

  const { posts, skip, totalPost } = useSelector((state) => state.post)
  // eslint-disable-next-line prefer-const
  let currentPage = useSelector((state) => state.post.currentPage)

  // const onChange = (data) => {
  //   currentPage = data
  //   console.log(currentPage, "currentPageIndex")
  //   return data
  // }

  // const pages = []
  // createPage(pages, totalPost, currentPage)

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(getAllPosts(0), actionGetCurrentPage(currentPage))
    } else {
      dispatch(
        getAllPosts(skip * currentPage - 10),
        actionGetCurrentPage(currentPage)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage])

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    fullText: Yup.string().min(20, "its too short").required("Required"),
    description: Yup.string().required("Required"),
  })

  const onSubmit = (values, props) => {
    dispatch(createNewPost(values))
    props.resetForm()
  }

  return (
    <div>
      <h4>Home Page</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, handleChange }) => (
          <Form>
            <TextField
              id="standard-basic"
              label="Enter post title"
              value={values.title}
              name="title"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Enter post text"
              value={values.fullText}
              name="fullText"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Add new post"
              value={values.description}
              name="description"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
            />
            <Errors errors={errors} />
            <Fab type="submit" color="primary" aria-label="edit">
              <AddCircleIcon
                sx={{
                  fontSize: "big",
                  borderRadius: "100%",
                }}
              />
            </Fab>
          </Form>
        )}
      </Formik>
      <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
        {posts?.map((item) => (
          <MediaCard key={item._id} item={item} />
        ))}
      </Grid>
      {/* <div className="pages">
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
      </div> */}
      <Pagination
        count={totalPost}
        defaultPage={currentPage}
        onChange={(e, page) => (
          dispatch(actionGetCurrentPage(page)), history.push(`/home?page=${page}`)
        )}
        // onChange={(e) => onChange(e.nativeEvent.srcElement.firstChild.data)}
      />
    </div>
  )
}
