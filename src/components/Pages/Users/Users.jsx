import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { useHistory } from "react-router-dom"
import { Grid } from "@mui/material"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { getAllPosts, createNewPost } from "../../../api/posts"
import { getUserInfo } from "../../../api/auth"
import { actionGetCurrentPage } from "../../../redux/actions/types"
// import { FormCreatePost } from "./FormCreatePost"
// import CustomizedDialogs from "./ModalPageCreatePost"
import { AllPagin } from "../../Pagination"
// import { CustomizedInputBase } from "./SearchPosts"

export const Users = () => {
  // const [searchPosts, setSearchPosts] = useState("")
  // const [showAllPost, setShowAllPost] = useState(false)
  // const [flag, setFlag] = useState(true)
  // const [color, setColor] = useState("primary")
  // const [anotherColor, setAnotherColor] = useState("secondary")
  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, users, skip, totalPost, id, informUser } = useSelector(
    (state) => state.user
  )

  const history = useHistory()
  const ofset = page * skip - 10

  const handleClick = () => {
    history.push("/posts/page/1")
  }

  return (
    <div>
      <h2>Users</h2>
      <h4 className="generalPageName">User Page</h4>
      <>
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
