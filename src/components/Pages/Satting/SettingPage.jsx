import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
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
  const dispatch = useDispatch()
  const history = useHistory()

  const tokenUser = localStorage.getItem("passport")
  function parseJwt(token) {
    // from jwt-key take info about user
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          // eslint-disable-next-line prefer-template
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    )
    return JSON.parse(jsonPayload)
  }
  const { name, email, dateCreated, _id, skills, profession, details, avatar } =
    parseJwt(tokenUser).user
  function redirectToRegister() {
    history.push("/register")
  }

  const onClickdeleteUser = () => {
    dispatch(deleteUser(_id))
    redirectToRegister()
  }
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch, _id])
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
            id={_id}
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
            <FormUpdateParamUser userId={_id} />
          </ModalProvider>
          <Button onClick={onClickdeleteUser}>{Labels.btnUserDeleteUser}</Button>
        </div>
      </div>
    </>
  )
}
