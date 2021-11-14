import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AccountCircle, Message } from "@mui/icons-material"
import {
  AppBar,
  Button,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import {
  userIsAuth,
  userDeleteAllInform,
  postDeleteAllInform,
} from "../../../redux/actions/types"
import { removeFromStorage } from "../../../utils/helpers"
import { Labels } from "../../../constantsName/constants"

const useStyles = makeStyles({
  boxFigureStyle: {
    color: "#fff",
    margin: "0",
    position: "fixed",
    zIndex: "999",
    marginLeft: "44px",
    marginTop: "-22px",
    webkitTapHighlightColor: "transparent",
  },
  userUp: {
    matginTop: "2px",
    webkitTapHighlightColor: "transparent",
  },
  menu: {
    position: "relative",
    zIndex: "1",
    webkitTapHighlightColor: "transparent",
  },
  linkClassNavbar: {
    fontSize: "20px",
    color: "#fff",
    marginLeft: "10px",
    webkitTapHighlightColor: "transparent",
  },
})

export const NavbarMaterial = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()

  const dispatch = useDispatch()

  const history = useHistory()

  function redirectToLogin() {
    history.push("/login")
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const onClickLogout = () => {
    dispatch(userIsAuth(false))
    dispatch(userDeleteAllInform())
    dispatch(postDeleteAllInform(null))
    removeFromStorage("passport")
    redirectToLogin()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="navbarBtn">
          <div className="leftGropuBtn">
            <Typography variant="h5" component="span">
              {Labels.labelNameNavbar}
            </Typography>
            <IconButton
              color="inherit"
              sx={{ webkitTapHighlightColor: "transparent" }}
            >
              <Message />
            </IconButton>
            <Link to="/ficus">
              <ListItemText
                disableTypography
                className={classes.linkClassNavbar}
                primary="Ficus"
              />
            </Link>
            <Link to="/posts/page/1">
              <ListItemText
                primary="Posts"
                disableTypography
                className={classes.linkClassNavbar}
              />
            </Link>
            <Link to="/users">
              <ListItemText
                primary="Users"
                disableTypography
                className={classes.linkClassNavbar}
              />
            </Link>
          </div>

          <div className="rightGropuBtn">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle
                sx={{
                  webkitTapHighlightColor: "transparent",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  webkitTapHighlightColor: "transparent",
                  margin: "0",
                  paddingTop: "2px",
                }}
                component="span"
              >
                {Labels.iconNameNavbar}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: 7 }}
              className={classes.menu}
            >
              <ChangeHistoryIcon className={classes.boxFigureStyle} />
              <MenuItem onClick={handleClose}>
                <Button>Setting</Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button onClick={onClickLogout}>Log Out</Button>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}
