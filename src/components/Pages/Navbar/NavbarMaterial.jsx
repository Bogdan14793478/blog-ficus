import React from "react"
import { Link, useHistory } from "react-router-dom"
import { AccountCircle, Message } from "@mui/icons-material"
import {
  AppBar,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import { removeFromStorage } from "../../../utils/helpers"

const useStyles = makeStyles({
  boxFigureStyle: {
    color: "#fff",
    margin: "0",
    position: "fixed",
    zIndex: "999",
    marginLeft: "44px",
    marginTop: "-22px",
  },
  userUp: {
    matginTop: "2px",
  },
  menu: {
    position: "relative",
    zIndex: "1",
  },
})

export const NavbarMaterial = () => {
  const history = useHistory()

  function redirectToLogin() {
    history.push("/login")
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const onClickLogout = () => {
    removeFromStorage("passport")
    redirectToLogin()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="span">
          Logo
        </Typography>
        <IconButton color="inherit">
          <Message />
        </IconButton>
        <Link to="/home">
          <ListItem button component="a">
            <ListItemText
              disableTypography
              style={{ fontSize: 20, color: "white" }}
              primary="Ficus"
            />
          </ListItem>
        </Link>
        <Link to="dialogs">
          <ListItem button component="a">
            <ListItemText
              primary="Posts"
              disableTypography
              style={{ fontSize: 20, color: "white" }}
            />
          </ListItem>
        </Link>
        <Link to="profile">
          <ListItem button component="a">
            <ListItemText
              primary="Users"
              disableTypography
              style={{ fontSize: 20, color: "white" }}
            />
          </ListItem>
        </Link>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ ml: 90 }}
          >
            <AccountCircle />
            <Typography variant="h6" component="span">
              User
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
      </Toolbar>
    </AppBar>
  )
}
