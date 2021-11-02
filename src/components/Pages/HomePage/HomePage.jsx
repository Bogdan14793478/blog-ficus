/* eslint-disable no-sequences */
/* eslint-disable prefer-spread */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Fab, Grid, Pagination, PaginationItem, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { MediaCard } from "./CardPage"
import { Errors } from "../../Authorization/Errors"
import { createNewPost, getAllPosts } from "../../../api/posts"
import { actionGetCurrentPage } from "../../../redux/actions/types"

const initialValues = {
  title: "",
  fullText: "",
  description: "",
}
export const HomePage = () => {
  const { page: locationElement } = useParams()
  const dispatch = useDispatch()
  console.log(locationElement, "locationElement")
  const { currentPage, posts, skip, totalPost } = useSelector((state) => state.post)
  const interval = locationElement * skip - 10

  useEffect(() => {
    dispatch(
      getAllPosts(interval, locationElement),
      actionGetCurrentPage(currentPage)
    )
    return true

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
      <Pagination
        count={totalPost}
        defaultPage={locationElement}
        onChange={(e, page) => dispatch(actionGetCurrentPage(page))}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/home/page/${item.page}`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        )}
      />
    </div>
  )
}
