/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from "react"
import { createNewCommit, deleteCommit } from "../../../api/posts"
import { FormCreateCommit } from "./FormCreateCommit"
import { GeneralList } from "./GeneralList"

export const GeneralLogic = ({ comments, userId, postID }) => {
  const [message, setMessage] = useState([])
  const [uniqueId, setUniqueId] = useState(1)
  const [numberPostID, setNumberPostID] = useState()
  const [followedCommentIDL, setFfollowedCommentID] = useState()
  const [show, setShow] = useState(false)

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
    const clonededMessage = [...message]
    if (followedCommentIDL === undefined) {
      // eslint-disable-next-line no-param-reassign
      values.followed = String(numberPostID)
      clonededMessage.push(values)
    } else if (
      followedCommentIDL === null ||
      typeof followedCommentIDL === "string"
    ) {
      const desiredCommit = findById(clonededMessage, numberPostID)
      // eslint-disable-next-line no-param-reassign
      values.followed = String(numberPostID)
      desiredCommit.children.push(values)
    }
    const { text } = values
    const followedCommentID = String(numberPostID)
    const data = { text, followedCommentID }
    createNewCommit(data, postID)
    setNumberPostID("")
    // eslint-disable-next-line no-param-reassign
    values._id = uniqueId + Date.now() + Math.random()
    setUniqueId(uniqueId + Date.now() + Math.random())
    setMessage(clonededMessage)
    props.resetForm()
    setShow(!show)
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
      <div style={{ paddingLeft: "50px" }}>
        <GeneralList
          show={show}
          setShow={setShow}
          message={message}
          userId={userId}
          postID={postID}
          initialValues={initialValues}
          onSubmit={onSubmit}
          followedCommentIDL={followedCommentIDL}
          setFfollowedCommentID={setFfollowedCommentID}
          setNumberPostID={setNumberPostID}
          deleteComment={deleteComment}
        />
      </div>
      <div style={{ paddingLeft: "50px" }}>
        <FormCreateCommit initialValues={initialValues} onSubmit={onSubmit} />
      </div>
    </div>
  )
}
