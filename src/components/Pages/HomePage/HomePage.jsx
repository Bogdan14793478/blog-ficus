import React, { useState, useEffect, useContext } from "react"
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
import {
  actionGetCurrentPage,
  actionPostDeleteAllInform,
} from "../../../redux/actions/types"
import { FormCreatePost } from "./FormCreatePost"
import { AllPagin } from "../../Pagination"
import { CustomizedInputBase } from "./SearchPosts"
import { Labels, Tabs } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"
import { ModalContext } from "../../../context"
import "./HomePage.css"
import { Loader } from "../Loader/Loader"

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
})
export const HomePage = () => {
  const [searchPosts, setSearchPosts] = useState("")
  const [showAllPost, setShowAllPost] = useState(false)
  const [activeTab, setActiveTab] = useState(Tabs.AllPosts)
  const { handleClickOpenModal } = useContext(ModalContext)

  const { page } = useParams()

  const dispatch = useDispatch()
  const { currentPage, posts, skip, totalPost, isFetching } = useSelector(
    (state) => state.post
  )
  const { findPost } = useSelector((state) => state.post)

  const { id } = useSelector((state) => state.auth)
  const history = useHistory()
  const ofset = page * skip - 10
  const namePage = Labels.nameUrlPostsPage
  const classes = useStyles()

  const redirectToPagePosts = () => {
    history.push("/posts/page/1")
  }

  const showPostUser = (parameterAffectstheDisplay, userId) => {
    dispatch(getAllPosts(0, userId))
    redirectToPagePosts()
    setShowAllPost(parameterAffectstheDisplay)
  }

  const passParamToGetPosts = () => {
    return showAllPost
      ? dispatch(getAllPosts(ofset, id, searchPosts))
      : dispatch(getAllPosts(ofset, null, searchPosts))
  }

  const searchInPosts = (e) => {
    e.preventDefault()
    passParamToGetPosts()
    setSearchPosts(searchPosts)
  }

  const filterPosts = (numberShowBtn, parameterAffectstheDisplay, userId) => {
    showPostUser(parameterAffectstheDisplay, userId)
    setActiveTab(numberShowBtn)
    setSearchPosts("")
    handleClickOpenModal()
  }

  const openTextPage = (numberShowBtn) => {
    setActiveTab(numberShowBtn)
    setSearchPosts("")
    dispatch(actionPostDeleteAllInform())
  }

  useEffect(() => {
    dispatch(getUserInfo())
    passParamToGetPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])

  return (
    <div>
      <h6 className="general-page-name">{Labels.namePagePost}</h6>
      <div className="button-home-page">
        <ButtonGroup>
          <Button
            variant={activeTab === Tabs.AllPosts ? "contained" : "outlined"}
            onClick={() => filterPosts(Tabs.AllPosts, false)}
            className={classes.root}
          >
            {Labels.showAllPosts}
          </Button>
          <Button
            variant={activeTab === Tabs.MyPosts ? "contained" : "outlined"}
            onClick={() => {
              filterPosts(Tabs.MyPosts, true, id)
            }}
            className={classes.root}
          >
            {Labels.filteredMyPosts}
          </Button>
          <Button
            variant={activeTab === Tabs.EmptyPage ? "contained" : "outlined"}
            onClick={() => openTextPage(Tabs.EmptyPage, false)}
            className={classes.root}
          >
            {Labels.btnTextPage}
          </Button>
        </ButtonGroup>
        <CustomizedInputBase
          setSearchPosts={setSearchPosts}
          startSearchInPosts={searchInPosts}
          searchPosts={searchPosts}
        />
        <ModalProvider
          buttonName={Labels.buttonNewPost}
          buttonNameOnForm={Labels.enterNewPost}
        >
          <FormCreatePost onSubmitPost={createNewPost} />
        </ModalProvider>
      </div>
      {activeTab === Tabs.EmptyPage && (
        <div className="name-thirdbtn-homepage">
          <h2>{Labels.textNamePage}</h2>
        </div>
      )}
      {isFetching && <Loader />}
      {activeTab === Tabs.MyPosts || activeTab === Tabs.AllPosts ? (
        <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
          {posts.map((item) => (
            <MediaCard
              key={item._id}
              item={item}
              showAllPost={showAllPost}
              userId={id}
              findPost={findPost}
            />
          ))}
        </Grid>
      ) : null}

      {(activeTab === Tabs.MyPosts || activeTab === Tabs.AllPosts) && !posts.length
        ? "No posts whot you want find"
        : null}
      <div className="pagination-all">
        <AllPagin
          totalPost={totalPost}
          page={page}
          actionGetCurrentPage={actionGetCurrentPage}
          namePage={namePage}
        />
      </div>
    </div>
  )
}
