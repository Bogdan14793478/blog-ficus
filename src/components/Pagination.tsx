/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import React from "react"
import { Pagination, PaginationItem } from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

interface Props {
  totalPost: number
  page: string
  actionGetCurrentPage: (page: number) => void
  namePage: string
}
export const AllPagin: React.FC<Props> = ({
  totalPost,
  page,
  actionGetCurrentPage,
  namePage,
}) => {
  const dispatch = useDispatch()

  return (
    <Pagination
      id="paginationComponent"
      count={totalPost}
      page={+page}
      onChange={(e, numpage) => dispatch(actionGetCurrentPage(numpage))}
      renderItem={item => (
        <PaginationItem component={Link} to={`${namePage}${item.page}`} {...item} />
      )}
    />
  )
}
