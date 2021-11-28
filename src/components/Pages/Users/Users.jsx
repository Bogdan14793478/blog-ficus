import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Grid } from "@mui/material"
import { actionUsersGetCurrentPage } from "../../../redux/actions/types"
import { AllPagin } from "../../Pagination"
import { MediaCard } from "./UsersPage"
import { getAllUsers } from "../../../api/usersAxios"
import { Labels } from "../../../constantsName/constants"
import { getUserInfo } from "../../../api/auth"
import { Table } from "./Table"

export const Users = () => {
  const [isFetching, setIsFetching] = useState(false)
  const { page } = useParams()
  const dispatch = useDispatch()
  const { currentPage, users, skip, totalPost, id, findUser } = useSelector(
    (state) => state.user
  )
  const namePage = Labels.ulrUsersPage
  const ofset = page * skip - 10

  const passParamToGetUsers = () => {
    dispatch(getAllUsers(ofset))
  }

  useEffect(() => {
    dispatch(getUserInfo())
    passParamToGetUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage, id])
  return (
    <div>
      <h4 className="general-page-name">{Labels.nameHeaderUserPage}</h4>
      <>
        <Grid container spacing={2}>
          {users?.map((item) => (
            <MediaCard
              key={item._id}
              item={item}
              userId={id}
              itemId={item._id}
              setIsFetching={setIsFetching}
            />
          ))}
        </Grid>
        {isFetching ? (
          <div className="my-modal-homepage2">
            <div className="lds-ring2">
              <Table setIsFetching={setIsFetching} findUser={findUser} />
            </div>
          </div>
        ) : (
          ""
        )}

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
