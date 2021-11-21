import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Grid } from "@mui/material"
import { actionUsersGetCurrentPage } from "../../../redux/actions/types"
import { AllPagin } from "../../Pagination"
import MediaCard from "./UsersPage"
import { getAllUsers } from "../../../api/usersAxios"
import { Labels } from "../../../constantsName/constants"

export const Users = () => {
  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, users, skip, totalPost, id } = useSelector(
    (state) => state.user
  )
  const namePage = Labels.ulrUsersPage

  const ofset = page * skip - 10

  const passParamToGetPosts = () => {
    console.log(page, "page")
    dispatch(getAllUsers(ofset))
  }

  useEffect(() => {
    // dispatch(getAllUsers(0))
    passParamToGetPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])
  return (
    <div>
      <h4 className="general-page-name">{Labels.nameHeaderUserPage}</h4>
      <>
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          {users?.map((item) => (
            <MediaCard key={item._id} item={item} userId={id} />
          ))}
        </Grid>
        <AllPagin
          totalPost={totalPost}
          page={page}
          actionGetCurrentPage={actionUsersGetCurrentPage}
          namePage={namePage}
        />
      </>
    </div>
  )
}
