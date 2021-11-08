/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable prefer-spread */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { Grid } from "@mui/material"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { MediaCard } from "./CardPage"
import { getAllPosts, createNewPost } from "../../../api/posts"
import { getUserInfo } from "../../../api/user"
import { actionGetCurrentPage } from "../../../redux/actions/types"
import { FormCreatePost } from "./FormCreatePost"
import CustomizedDialogs from "./ModalPageCreatePost"
import { AllPagin } from "../../Pagination"
import { CustomizedInputBase } from "./SearchPosts"
import {
  homePageButtonName,
  homePageButtonNameOnForm,
} from "../../../constantsName/constantsName"

export const HomePage = () => {
  const [searchPosts, setSearchPosts] = useState("")
  const [showAllPost, setShowAllPost] = useState(false)
  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, posts, skip, totalPost } = useSelector((state) => state.post)
  const { id, informUser } = useSelector((state) => state.user)
  const history = useHistory()
  const ofset = page * skip - 10

  const handleClick = () => {
    history.push("/posts/page/1")
  }

  const filterPosts = (bool, number) => {
    dispatch(getAllPosts(0, number))
    handleClick()
    setShowAllPost(bool)
  }

  const startSearchInPosts = (e) => {
    e.preventDefault()
    showAllPost
      ? dispatch(getAllPosts(ofset, id, searchPosts))
      : dispatch(getAllPosts(ofset, null, searchPosts))
    setSearchPosts("")
  }

  useEffect(() => {
    dispatch(getUserInfo())
    showAllPost
      ? dispatch(getAllPosts(ofset, id, searchPosts))
      : dispatch(getAllPosts(ofset))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])

  return (
    <div>
      <h4 className="generalPageName">Home Page</h4>
      <div className="buttonHomePage">
        <ButtonGroup disableElevation variant="contained">
          <Button onClick={() => filterPosts(false)}>Show all posts</Button>
          <Button onClick={() => filterPosts(true, id)}>Show my posts</Button>
        </ButtonGroup>
        <CustomizedInputBase
          setSearchPosts={setSearchPosts}
          startSearchInPosts={startSearchInPosts}
          searchPosts={searchPosts}
        />
        <CustomizedDialogs
          buttonName={homePageButtonName}
          buttonNameOnForm={homePageButtonNameOnForm}
        >
          <FormCreatePost typeAxiosParam={createNewPost} />
        </CustomizedDialogs>
      </div>
      <>
        <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
          {posts?.map((item) => (
            <MediaCard
              key={item._id}
              item={item}
              showAllPost={showAllPost}
              idUser={id}
            />
          ))}
        </Grid>
        <AllPagin
          totalPost={totalPost}
          page={page}
          actionGetCurrentPage={actionGetCurrentPage}
          id={id}
        />
      </>
    </div>
  )
}
