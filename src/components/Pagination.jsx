/* eslint-disable react/react-in-jsx-scope */
import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

export const AllPagin = ({
  totalPost,
  locationElement,
  actionGetCurrentPage,
  id,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  if (id) {
    return (
      <Pagination
        id="paginationComponent"
        count={totalPost}
        page={+locationElement}
        onChange={(e, page) => dispatch(actionGetCurrentPage(page))}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/posts/page/${item.page}`} // ulr string
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        )}
      />
    )
  }
  return (
    <Pagination
      id="paginationComponent"
      count={totalPost}
      page={+locationElement}
      onChange={(e, page) => dispatch(actionGetCurrentPage(page))}
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
