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
import "./SettingPage.css"

export const SettingPage = () => {
  // eslint-disable-next-line operator-linebreak
  const { name, email, dateCreated, id, skills, profession, details, avatar } =
    useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  function redirectToRegister() {
    history.push("/register")
  }

  const onClickdeleteUser = () => {
    dispatch(deleteUser(id))
    redirectToRegister()
  }
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch, id])
  return (
    <>
      <div className="setting-page-wrapper">
        <h4 className="general-page-name">{Labels.nameHeaderSettingPage}</h4>
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: "20px",
            marginLeft: "0 auto",
            justifyContent: "center",
          }}
        >
          <Table
            id={id}
            name={name}
            email={email}
            dateCreated={dateCreated}
            skills={skills}
            profession={profession}
            details={details}
          />
        </Grid>
        {avatar && (
          <CardMedia sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <img
              src={`${process.env.REACT_APP_URL_SERVER_ADRESS}${avatar}`}
              alt="green"
              className="avatar-user-setting"
            />
          </CardMedia>
        )}
        <div className="btn-setting-group">
          <ModalProvider
            buttonName={Labels.buttonUpdUser}
            buttonNameOnForm={Labels.buttonModalNameSetting}
          >
            <FormUpdateParamUser userId={id} />
          </ModalProvider>
          <Button onClick={onClickdeleteUser}>{Labels.btnUserDeleteUser}</Button>
        </div>
      </div>
    </>
  )
}
