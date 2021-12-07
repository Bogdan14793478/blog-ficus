/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { createNewCommit, deleteCommit } from "../../../api/posts"
import { FormCreateComment } from "./FormCreateComent"
import { GeneralList } from "./GeneralList"
import { findById } from "../../../utils/helpers"

export const GeneralLogic = ({ comments, userId, postID }) => {
  const [message, setMessage] = useState([])

  const onSubmit = (values, props) => {
    const clonededMessage = [...message]
    if (values.followedCommentID === undefined) {
      clonededMessage.push(values)
    } else if (typeof values.followedCommentID === "string") {
      const desiredCommit = findById(clonededMessage, values.numberPostID)
      desiredCommit.children.push(values)
    }
    const { text, followedCommentID } = values
    const data = { text, followedCommentID }
    createNewCommit(data, postID)
    values._id = nanoid()
    setMessage(clonededMessage)
    props.resetForm()
  }

  const deleteComment = (comentID, parentPostID) => {
    let clonededMessage = [...message]
    if (parentPostID) {
      const parentComment = findById(clonededMessage, parentPostID)
      parentComment.children = parentComment.children.filter(
        (child) => child._id !== comentID
      )
    } else {
      clonededMessage = clonededMessage.filter((mes) => mes._id !== comentID)
    }
    setMessage(clonededMessage)
    deleteCommit(comentID)
  }

  console.log(message, "message")

  useEffect(() => {
    const messages = []
    for (const item of comments) {
      item.children = []
      if (!item.followedCommentID) {
        const filterdMessages = comments.filter(
          (filteredItem) => item._id === filteredItem.followedCommentID
        )
        item.children = filterdMessages
        messages.push(item)
      }
    }
    setMessage(messages)
  }, [comments])

  return (
    <div>
      <div style={{ paddingLeft: "40px" }}>
        <GeneralList
          message={message}
          onSubmit={onSubmit}
          deleteComment={deleteComment}
        />
      </div>
      <div style={{ paddingLeft: "60px" }}>
        <FormCreateComment onSubmit={onSubmit} />
      </div>
    </div>
  )
}
