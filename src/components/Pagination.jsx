/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

export const AllPagin = ({ totalPost, page, actionGetCurrentPage, namePage }) => {
  const dispatch = useDispatch()

  return (
    <Pagination
      // sx={{ marginTop: "70.3vh" }}
      id="paginationComponent"
      count={totalPost}
      page={+page}
      onChange={(e, numpage) => dispatch(actionGetCurrentPage(numpage))}
      renderItem={(item) => (
        <PaginationItem component={Link} to={`${namePage}${item.page}`} {...item} />
      )}
    />
  )
}
