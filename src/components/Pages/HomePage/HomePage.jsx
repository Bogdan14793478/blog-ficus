/* eslint-disable no-sequences */
/* eslint-disable prefer-spread */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { Grid, Pagination, PaginationItem } from "@mui/material"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { MediaCard } from "./CardPage"
import { getAllPosts } from "../../../api/posts"
import { getIdandEmail } from "../../../api/user"
import { actionGetCurrentPage } from "../../../redux/actions/types"
import { FormCreatePost } from "./FormCreatePost"
import CustomizedDialogs from "./ModalPageCreatePost"
import { AllPagin } from "../../Pagination"

export const HomePage = () => {
  const [ShowAllPost, setShowAllPost] = useState(false)
  const { page: locationElement } = useParams()
  const dispatch = useDispatch()
  const { currentPage, posts, skip, totalPost } = useSelector((state) => state.post)
  const { id, informUser } = useSelector((state) => state.user)
  const history = useHistory()
  const ofset = locationElement * skip - 10

  const handleClick = () => {
    history.push("/posts/page/1")
  }

  const filterPosts = (number) => {
    dispatch(getAllPosts(0, number))
    handleClick()
    setShowAllPost(true)
  }
  const showAllPosts = () => {
    dispatch(getAllPosts(0))
    handleClick()
    setShowAllPost(false)
  }

  useEffect(() => {
    if (ShowAllPost) {
      dispatch(getIdandEmail())
      dispatch(getAllPosts(ofset, id))
      return
    }
    dispatch(getIdandEmail())
    dispatch(getAllPosts(ofset))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])

  return (
    <div>
      <h4 className="generalPageName">Home Page</h4>
      <div className="buttonHomePage">
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={showAllPosts}>Show all posts</Button>
          <Button onClick={() => filterPosts(id)}>Show my posts</Button>
        </ButtonGroup>
        <CustomizedDialogs>
          <FormCreatePost />
        </CustomizedDialogs>
      </div>
      {ShowAllPost ? (
        <>
          {/* Filter post */}
          <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
            {posts?.map((item) => (
              <MediaCard key={item._id} item={item} ShowAllPost={ShowAllPost} />
            ))}
          </Grid>
          <AllPagin
            totalPost={totalPost}
            locationElement={locationElement}
            actionGetCurrentPage={actionGetCurrentPage}
            id={id}
          />
        </>
      ) : (
        <>
          <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
            {posts?.map((item) => (
              <MediaCard key={item._id} item={item} />
            ))}
          </Grid>
          <AllPagin
            totalPost={totalPost}
            locationElement={locationElement}
            actionGetCurrentPage={actionGetCurrentPage}
          />
        </>
      )}
    </div>
  )
}
