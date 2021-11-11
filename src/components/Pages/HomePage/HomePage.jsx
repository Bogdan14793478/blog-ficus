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
import { makeStyles } from "@mui/styles"
import { MediaCard } from "./CardPage"
import { getAllPosts, createNewPost } from "../../../api/posts"
import { getUserInfo } from "../../../api/auth"
import { actionGetCurrentPage } from "../../../redux/actions/types"
import { FormCreatePost } from "./FormCreatePost"
import CustomizedDialogs from "./ModalPageCreatePost"
import { AllPagin } from "../../Pagination"
import { CustomizedInputBase } from "./SearchPosts"
import { Labels } from "../../../constantsName/constants"

const useStyles = makeStyles({
  primeColor: {
    color: "#bf453b",
  },
  secondaryColor: {
    color: "#e0d5d5",
  },
})

export const HomePage = () => {
  const classes = useStyles()
  const [searchPosts, setSearchPosts] = useState("")
  const [showAllPost, setShowAllPost] = useState(false)
  const [activeTab, setActiveTab] = useState(true)
  // const [color, setColor] = useState("primary")
  // const [anotherColor, setAnotherColor] = useState("secondary")
  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, posts, skip, totalPost } = useSelector((state) => state.post)
  const { id, informUser } = useSelector((state) => state.user)
  const history = useHistory()
  const ofset = page * skip - 10

  const handleClick = () => {
    history.push("/posts/page/1")
  }

  const filterPosts = (resultOnClick, idUser) => {
    dispatch(getAllPosts(0, idUser))
    handleClick()
    setShowAllPost(resultOnClick)
  }
  const takeParamForAllPosts = () => {
    showAllPost
      ? dispatch(getAllPosts(ofset, id, searchPosts))
      : dispatch(getAllPosts(ofset, null, searchPosts))
  }

  const startSearchInPosts = (e) => {
    e.preventDefault()
    takeParamForAllPosts()
    setSearchPosts("")
  }

  const chengeColor = (resultOnClick, idUser) => {
    filterPosts(resultOnClick, idUser), setActiveTab(!resultOnClick)
  }

  useEffect(() => {
    dispatch(getUserInfo())
    takeParamForAllPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])

  return (
    <div>
      <h4 className="generalPageName">Home Page</h4>
      <div className="buttonHomePage">
        <ButtonGroup disableElevation variant="contained">
          <Button
            // color={activeTab ? color : anotherColor}
            {
              activeTab
                ? className={classes.primeColor}
                : className={classes.secondaryColor}
            }
            onClick={() => chengeColor(false)}
          >
            Show all posts
          </Button>

          {activeTab ? (
            <Button
              className={classes.secondaryColor}
              onClick={() => {
                chengeColor(false)
              }}
            >
              Show my posts
            </Button>
          ) : (
            <Button
              className={classes.primeColor}
              onClick={() => {
                chengeColor(true, id)
              }}
            >
              Show my posts
            </Button>
          )}

          {/* <Button
            // color={activeTab ? anotherColor : color}
            color={
              activeTab
                ? (className={classes.secondaryColor})
                : (className={classes.primeColor})
            }
            onClick={() => {
              chengeColor(true, id)
            }}
          >
            Show my posts
          </Button> */}
        </ButtonGroup>
        <CustomizedInputBase
          setSearchPosts={setSearchPosts}
          startSearchInPosts={startSearchInPosts}
          searchPosts={searchPosts}
        />
        <CustomizedDialogs
          buttonName={Labels.homePageButton}
          buttonNameOnForm={Labels.homePageButtonNameOnForm}
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
        />
      </>
    </div>
  )
}
