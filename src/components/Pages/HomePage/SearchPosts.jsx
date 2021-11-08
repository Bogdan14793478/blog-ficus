/* eslint-disable import/no-default-export */
import * as React from "react"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"

export const CustomizedInputBase = ({
  startSearchInPosts,
  setSearchPosts,
  searchPosts,
}) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search in posts"
        value={searchPosts}
        onChange={(event) => {
          setSearchPosts(event.target.value)
        }}
      />
      <IconButton
        onClick={startSearchInPosts}
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
