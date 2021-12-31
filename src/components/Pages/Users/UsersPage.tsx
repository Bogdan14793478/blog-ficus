import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { Grid } from "@mui/material"
import { actionUsersGetCurrentPage } from "../../../redux/actions/typeActionUser"
import { AllPagin } from "../../Pagination"
import { MediaCard } from "./MediaCard"
import { getAllUsers } from "../../../api/usersAxios"
import { Labels } from "../../../constantsName/constants"
import { getUserInfo } from "../../../api/auth"
import { Loader } from "../Loader/Loader"
import { useAppSelector } from "../../../hooks/index"

export const UsersPage = () => {
  const { page } = useParams<{ page: string }>()
  const dispatch = useDispatch()
  // eslint-disable-next-line operator-linebreak
  const { currentPage, users, skip, totalPost, findUser, isFetching } =
    useAppSelector(state => state.user)
  const { id } = useAppSelector(state => state.auth)
  const namePage = Labels.ulrUsersPage
  const ofset = +page * skip - 10
  const newOfset = String(ofset)

  const passParamToGetUsers = () => {
    dispatch(getAllUsers(newOfset))
  }

  useEffect(() => {
    dispatch(getUserInfo())
    passParamToGetUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])
  return (
    <div>
      <h4 className="general-page-name">{Labels.nameHeaderUserPage}</h4>
      <Grid container spacing={2}>
        {users?.map(item => (
          <MediaCard
            key={item._id}
            item={item}
            itemId={item._id}
            findUser={findUser}
          />
        ))}
      </Grid>
      {isFetching && <Loader />}
      <div className="pagination-all">
        <AllPagin
          totalPost={totalPost}
          page={page}
          actionGetCurrentPage={actionUsersGetCurrentPage}
          namePage={namePage}
        />
      </div>
    </div>
  )
}
