import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Button, CardMedia, Grid } from "@mui/material"
import { Labels } from "../../../constantsName/constants"
import { getUserInfo } from "../../../api/auth"
import { Table } from "./Table"
import { deleteUser } from "../../../api/usersAxios"
import { FormUpdateParamUser } from "./FormUpdateParamUser"
import { ModalProvider } from "../../../context"

export const Setting = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { name, informUser, dateCreated, id, skills, profession, details, avatar } =
    useSelector((state) => state.user)

  function redirectToRegister() {
    history.push("/register")
  }

  const onClickdeleteUser = () => {
    dispatch(deleteUser(id))
    redirectToRegister()
  }
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
      {avatar && (
        <CardMedia
          component="img"
          height="240"
          image={`${process.env.REACT_APP_URL_SERVER_ADRESS}${avatar}`}
        />
      )}
      <ModalProvider
        buttonName={Labels.buttonUpdUser}
        buttonNameOnForm={Labels.buttonModalNameSetting}
      >
        <FormUpdateParamUser userId={id} />
      </ModalProvider>
      <Button onClick={onClickdeleteUser}>{Labels.btnUserDeleteUser}</Button>
    </>
  )
}
