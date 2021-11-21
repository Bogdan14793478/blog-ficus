import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Button, Grid } from "@mui/material"
import { actionUsersGetCurrentPage } from "../../../redux/actions/types"
import { AllPagin } from "../../Pagination"
import MediaCard from "./UsersPage"
import { getAllUsers } from "../../../api/usersAxios"
import { Labels } from "../../../constantsName/constants"
import { getUserInfo } from "../../../api/auth"

export const Users = () => {
  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, users, skip, totalPost, id } = useSelector(
    (state) => state.user
  )
  const namePage = Labels.ulrUsersPage

  const ofset = page * skip - 10

  const showAllUsers = () => {
    dispatch(getAllUsers(0))
  }
  const passParamToGetPosts = () => {
    console.log(page, "page")
    dispatch(getAllUsers(ofset))
  }

  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getAllUsers(0))
    // passParamToGetPosts()  need find page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])
  return (
    <div>
      <h4 className="general-page-name">{Labels.nameHeaderUserPage}</h4>
      <>
        {
          // eslint-disable-next-line valid-typeof
          Array.isArray(users) ? (
            <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
              {users?.map((item) => (
                <MediaCard key={item._id} item={item} userId={id} />
              ))}
            </Grid>
          ) : (
            <>
              <Grid
                container
                spacing={2}
                sx={{ marginBottom: "20px", marginLeft: "50px" }}
              >
                <p>
                  User Id is {users._id}
                  <br />
                  User email is {users.email} <br />
                  Date create acaunt is {users.dateCreated} <br />
                </p>
              </Grid>
              <Button onClick={showAllUsers}>Show all users</Button>
            </>
          )
        }

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
