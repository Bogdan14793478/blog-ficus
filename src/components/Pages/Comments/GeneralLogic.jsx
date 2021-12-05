/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import React, { useState, useContext, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import { Form, Formik, FieldArray } from "formik"
import * as Yup from "yup"
import { Fab, Grid, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg } from "../../../constantsName/constants"
import { ModalContext } from "../../../context"
import { createNewCommit, deleteCommit } from "../../../api/posts"
import { FormCreateCommit } from "./FormCreateCommit"
import { MediaCardComments } from "./CommentsPage"

const validationSchema = Yup.object().shape({
  text: Yup.string().min(4, ErrorMsg.roolMinTitle).required(ErrorMsg.resultRequired),
})

export const GeneralLogic = ({ comments, userId, postID }) => {
  // eslint-disable-next-line prefer-const
  const [massage, setMessage] = useState([])
  const [uniqueId, setUniqueId] = useState(1)
  const [numberPostID, setNumberPostID] = useState()
  const [followedCommentIDL, setFfollowedCommentID] = useState()
  const initialValues = {
    text: "",
    children: [],
    followed: null,
    commented: userId,
    _id: "",
  }

  const findById = (data, id) => {
    for (const element of data) {
      if (element._id === id) {
        return element
      }
      if (element.children) {
        const desiredElement = findById(element.children, id)
        if (desiredElement) {
          return desiredElement
        }
      }
    }
    return false
  }
  const onSubmit = (values, props) => {
    if (followedCommentIDL === undefined) {
      // eslint-disable-next-line no-param-reassign
      values.followed = numberPostID
      massage.push(values)
    } else if (
      followedCommentIDL === null ||
      typeof followedCommentIDL === "string"
    ) {
      const desiredCommit = findById(massage, numberPostID)
      // eslint-disable-next-line no-param-reassign
      values.followed = numberPostID
      // console.log(desiredCommit, "desiredCommit")
      desiredCommit.children.push(values)
    }
    const { text } = values
    const followedCommentID = numberPostID || userId
    // console.log(numberPostID, "numberPostIDnumberPostID")
    const data = { text, followedCommentID }
    createNewCommit(data, postID)
    setNumberPostID("")
    // eslint-disable-next-line no-param-reassign
    values._id = uniqueId + Date.now() + Math.random()
    setUniqueId(uniqueId + Date.now() + Math.random())
    props.resetForm()
  }

  const deleteComment = (comentID, parentPostID) => {
    // console.log(comentID, "postIDS")
    // console.log(parentPostID, "followed")
    if (parentPostID) {
      const parentComment = findById(massage, comentID)
      // console.log(parentComment, "parentComment")
      parentComment.children = parentComment.children.filter(
        (child) => child._id !== comentID
      )
    } else {
      setMessage(massage.filter((mes) => mes._id !== comentID))
    }
    deleteCommit(comentID)
  }

  console.log(massage, "massage")

  useEffect(() => {
    const messages = []
    for (const item of comments) {
      item.children = []
      if (!item.followedCommentID) {
        // console.log(item.children, "massage[i]")
        const filterdMessages = comments.filter(
          (filteredItem) => item._id === filteredItem.followedCommentID
        )
        item.children = filterdMessages
        messages.push(item)
      }
    }
    setMessage(messages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments])

  return (
    <div>
      {massage && (
        <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
          {massage.map((item) => (
            <>
              <MediaCardComments
                key={item._id}
                item={item}
                comments={comments}
                userId={userId}
                postID={postID}
                initialValues={initialValues}
                onSubmit={onSubmit}
                setFfollowedCommentID={setFfollowedCommentID}
                setNumberPostID={setNumberPostID}
                deleteComment={deleteComment}
              />

              {/* <div className="children-comment">
                {massage.children?.map((child) => (
                  <MediaCardComments
                    key={child._id}
                    item={child}
                    comments={comments}
                    userId={userId}
                    postID={postID}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    setFfollowedCommentID={setFfollowedCommentID}
                    setNumberPostID={setNumberPostID}
                    deleteComment={deleteComment}
                  />
                ))}
              </div> */}
            </>
          ))}
        </Grid>
      )}

      <FormCreateCommit initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  )
}
