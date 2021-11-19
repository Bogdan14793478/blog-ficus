/* eslint-disable import/no-default-export */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react"
import { useState } from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { ModalContext } from "./ModalContext"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

const useStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
  },
})

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export const ModalProvider = ({ children, buttonName, buttonNameOnForm }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClickOpenModal = () => {
    setOpen(true)
  }

  const handleClickCloseModal = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpenModal}
        className={classes.root}
      >
        {buttonName}
      </Button>
      <BootstrapDialog
        onClose={handleClickCloseModal}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClickCloseModal}
        >
          {buttonNameOnForm}
        </BootstrapDialogTitle>
        <ModalContext.Provider value={(handleClickOpenModal, handleClickCloseModal)}>
          <DialogContent dividers>{children}</DialogContent>
        </ModalContext.Provider>
      </BootstrapDialog>
    </div>
  )
}
