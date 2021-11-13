import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@mui/material"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { MediaCard } from "./CardPage"
import { getAllPosts, createNewPost } from "../../../api/posts"
import { getUserInfo } from "../../../api/auth"
import { actionGetCurrentPage } from "../../../redux/actions/types"
import { FormCreatePost } from "./FormCreatePost"
import CustomizedDialogs from "./ModalPageCreatePost"
import { AllPagin } from "../../Pagination"
import { CustomizedInputBase } from "./SearchPosts"
import { Labels } from "../../../constantsName/constants"

// const useStyles = makeStyles({
//   buttonBlue: {
//     color: "#ffffff",
//     background: "#bf453b",
//     "&:active": {
//       variant: "outlined",
//       backgroundColor: "#e0d5d5",
//       color: "#ffffff",
//     },
//   },
// })

export const HomePage = () => {
  const [searchPosts, setSearchPosts] = useState("")
  const [showAllPost, setShowAllPost] = useState(false)
  const [activeTab, setActiveTab] = useState(true)
  // const classes = useStyles()
  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, posts, skip, totalPost } = useSelector((state) => state.post)
  const { id } = useSelector((state) => state.user)
  const history = useHistory()
  const ofset = page * skip - 10

  const redirectToPagePosts = () => {
    history.push("/posts/page/1")
  }

  const filterPosts = (resultOnClick, userId) => {
    dispatch(getAllPosts(0, userId))
    redirectToPagePosts()
    setShowAllPost(resultOnClick)
  }
  const takeParamForAllPosts = () => {
    return showAllPost
      ? dispatch(getAllPosts(ofset, id, searchPosts))
      : dispatch(getAllPosts(ofset, null, searchPosts))
  }

  const startSearchInPosts = (e) => {
    e.preventDefault()
    takeParamForAllPosts()
    setSearchPosts("")
  }

  const startFilterPost = (resultOnClick, userId) => {
    filterPosts(resultOnClick, userId)
    setActiveTab(!resultOnClick)
  }
  // const startOpenThirdPage = () => {
  //   filterPosts(0)
  // }

  useEffect(() => {
    dispatch(getUserInfo())
    takeParamForAllPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])

  return (
    <div>
      <h4 className="generalPageName">{Labels.homePageName}</h4>
      <div className="buttonHomePage">
        <ButtonGroup>
          <Button
            variant={activeTab ? "contained" : "outlined"}
            // className={classes.buttonBlue}
            onClick={() => startFilterPost(false)}
          >
            {Labels.showAllPosts}
          </Button>
          <Button
            variant={activeTab ? "outlined" : "contained"}
            // className={classes.buttonBlue}
            onClick={() => {
              startFilterPost(true, id)
            }}
          >
            {Labels.filteredMyPosts}
          </Button>
          {/* <Button onClick={startOpenThirdPage}>
            {Labels.homePageButtonThirdName}
          </Button> */}
        </ButtonGroup>
        <CustomizedInputBase
          setSearchPosts={setSearchPosts}
          startSearchInPosts={startSearchInPosts}
          searchPosts={searchPosts}
        />
        <CustomizedDialogs
          buttonName={Labels.homePageButton}
          buttonNameOnForm={Labels.enterNewPost}
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
              userId={id}
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
