/* eslint-disable react/react-in-jsx-scope */
import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

export const AllPagin = ({ totalPost, page, actionGetCurrentPage, id }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()

  return (
    <Pagination
      id="paginationComponent"
      count={totalPost}
      page={+page}
      onChange={(e, numpage) => dispatch(actionGetCurrentPage(numpage))}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/posts/page/${item.page}`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...item}
        />
      )}
    />
  )
}
