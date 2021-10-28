import React from "react"
import { AccountCircle, Message } from "@mui/icons-material"
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory"
import { theme } from "../../../utils/themeNavbar"

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
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  // console.log(theme, "theme")

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
        <List>
          <ListItem button component="a" href="/home">
            <ListItemText
              disableTypography
              style={{ fontSize: 20 }}
              primary="Ficus"
            />
          </ListItem>
        </List>
        <List>
          <ListItem button component="a" href="/dialogs">
            <ListItemText
              primary="Posts"
              disableTypography
              style={{ fontSize: 20 }}
            />
          </ListItem>
        </List>
        <List>
          <ListItem button component="a" href="/profile">
            <ListItemText
              primary="Users"
              disableTypography
              style={{ fontSize: 20 }}
            />
          </ListItem>
        </List>
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
              <Button>Log Out</Button>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
