/* eslint-disable no-sequences */
/* eslint-disable prefer-spread */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Grid, Pagination, PaginationItem } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { MediaCard } from "./CardPage"
import { getAllPosts } from "../../../api/posts"
import { actionGetCurrentPage } from "../../../redux/actions/types"
import { FormCreatePost } from "./FormCreatePost"
import CustomizedDialogs from "./ModalPage"

export const HomePage = () => {
  const { page: locationElement } = useParams()
  const dispatch = useDispatch()
  const { currentPage, posts, skip, totalPost } = useSelector((state) => state.post)
  const ofset = locationElement * skip - 10

  useEffect(() => {
    dispatch(getAllPosts(ofset))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage])

  return (
    <div>
      <h4 className="generalPageName">Home Page</h4>

      <CustomizedDialogs>
        <FormCreatePost />
      </CustomizedDialogs>
      <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
        {posts?.map((item) => (
          <MediaCard key={item._id} item={item} />
        ))}
      </Grid>
      <Pagination
        id="paginationComponent"
        count={totalPost}
        page={+locationElement || 1}
        onChange={(e, page) => dispatch(actionGetCurrentPage(page))}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/posts/page/${item.page}`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        )}
      />
    </div>
  )
}
