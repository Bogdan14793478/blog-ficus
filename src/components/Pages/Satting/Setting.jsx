import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Button, Grid } from "@mui/material"
import { Labels } from "../../../constantsName/constants"
import { getUserInfo } from "../../../api/auth"
import { Table } from "./Table"
import { deleteUser } from "../../../api/usersAxios"

export const Setting = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { name, informUser, dateCreated, id, skills, profession, details } =
    useSelector((state) => state.user)

  function redirectToRegister() {
    history.push("/register")
  }

  const onClickdeleteUser = () => {
    dispatch(deleteUser(id))
    redirectToRegister()
  }
  console.log(informUser, dateCreated, id, "users")

  useEffect(() => {
    dispatch(getUserInfo())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id])
  return (
    <>
      <h4 className="general-page-name">{Labels.nameHeaderSettingPage}</h4>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: "20px", marginLeft: "0 auto", justifyContent: "center" }}
      >
        <Table
          id={id}
          name={name}
          informUser={informUser}
          dateCreated={dateCreated}
          skills={skills}
          profession={profession}
          details={details}
        />
      </Grid>
      <Button onClick={deleteUser}>{Labels.namebtnMoreInfo}</Button>
      <Button onClick={onClickdeleteUser}>{Labels.btnUserDeleteUser}</Button>
    </>
  )
}
