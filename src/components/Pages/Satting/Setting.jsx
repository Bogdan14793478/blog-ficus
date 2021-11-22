import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Grid } from "@mui/material"
import { Labels } from "../../../constantsName/constants"
import { getUserInfo } from "../../../api/auth"
import { Table } from "./Table"

export const Setting = () => {
  const dispatch = useDispatch()
  const { informUser, dateCreated, id, skills, profession, details } = useSelector(
    (state) => state.user
  )
  const deleteUser = () => {}
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
          informUser={informUser}
          dateCreated={dateCreated}
          skills={skills}
          profession={profession}
          details={details}
        />
        {/* <p>
          {Labels.inputUserID} {id}
          <br />
          {Labels.inputUserEmail} {informUser} <br />
          {Labels.inputUserDateCreateAccount} {dateCreated} <br />
        </p> */}
      </Grid>
      <Button onClick={deleteUser}>{Labels.btnUserDeleteUser}</Button>
      <Button onClick={deleteUser}>{Labels.btnUserDeleteUser}</Button>
    </>
  )
}
