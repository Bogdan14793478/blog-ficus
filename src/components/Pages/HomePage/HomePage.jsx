import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { Grid } from "@mui/material"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { MediaCard } from "./CardPage"
import { getAllPosts, createNewPost } from "../../../api/posts"
import { getUserInfo } from "../../../api/auth"
import {
  actionGetCurrentPage,
  actionPostDeleteAllInform,
} from "../../../redux/actions/types"
import { FormCreatePost } from "./FormCreatePost"
// import { CustomizedDialogs } from "./ModalPageCreatePost"
import { AllPagin } from "../../Pagination"
import { CustomizedInputBase } from "./SearchPosts"
import { Labels, Tabs } from "../../../constantsName/constants"
import { ModalProvider } from "../../../context/ModalContext"

export const HomePage = () => {
  const [searchPosts, setSearchPosts] = useState("")
  const [showAllPost, setShowAllPost] = useState(false)
  const [activeTab, setActiveTab] = useState(1)

  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, posts, skip, totalPost } = useSelector((state) => state.post)
  const { id } = useSelector((state) => state.user)
  const history = useHistory()
  const ofset = page * skip - 10
  const namePage = Labels.urlPostsPage

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
      <h4 className="general-page-name">{Labels.namePagePost}</h4>
      <div className="button-home-page">
        <ButtonGroup>
          <Button
            variant={activeTab === Tabs.AllPosts ? "contained" : "outlined"}
            onClick={() => filterPosts(Tabs.AllPosts, false)}
            style={{
              backgroundColor: "transparent",
              color: "#000000",
            }}
          >
            {Labels.showAllPosts}
          </Button>
          <Button
            variant={activeTab === Tabs.MyPosts ? "contained" : "outlined"}
            onClick={() => {
              filterPosts(Tabs.MyPosts, true, id)
            }}
            style={{
              backgroundColor: "transparent",
              color: "#000000",
            }}
          >
            {Labels.filteredMyPosts}
          </Button>
          <Button
            variant={activeTab === Tabs.EmptyPage ? "contained" : "outlined"}
            onClick={() => openTextPage(Tabs.EmptyPage, false)}
            style={{
              backgroundColor: "transparent",
              color: "#000000",
            }}
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
          <FormCreatePost typeAxiosParam={createNewPost} />
        </ModalProvider>
      </div>
      <>{activeTab === Tabs.EmptyPage ? <h2>{Labels.textNamePage}</h2> : ""}</>
      <>
        {activeTab === Tabs.MyPosts || activeTab === Tabs.AllPosts ? (
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
        ) : (
          ""
        )}

        <AllPagin
          totalPost={totalPost}
          page={page}
          actionGetCurrentPage={actionGetCurrentPage}
          namePage={namePage}
        />
      </>
    </div>
  )
}
