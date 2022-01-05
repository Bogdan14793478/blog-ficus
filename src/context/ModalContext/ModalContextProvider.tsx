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
    backgroundImage:
      "linear-gradient(to right top, #fcfdf6, #fcfdf6, #fcfdf6, #fcfdf6, #fcfdf6))",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
  },
})

const BootstrapDialogTitle = (props: {
  [x: string]: any
  children: any
  onClose: any
}) => {
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
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

type ModalProviderType = {
  // eslint-disable-next-line react/require-default-props
  children?: any
  buttonName: string
  buttonNameOnForm: string
  // eslint-disable-next-line react/require-default-props
  takeInfo?: any
}

export const ModalProvider: React.FC<ModalProviderType> = ({
  children,
  buttonName,
  buttonNameOnForm,
  takeInfo,
}) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClickOpenModal = () => {
    if (takeInfo) {
      takeInfo()
    }
    setOpen(true)
  }

  const handleClickCloseModal = () => {
    debugger
    setOpen(false)
  }

  const valueModalProvider = {
    handleClickOpenModal,
    handleClickCloseModal,
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
        <ModalContext.Provider value={valueModalProvider}>
          <DialogContent dividers>{children}</DialogContent>
        </ModalContext.Provider>
      </BootstrapDialog>
    </div>
  )
}
