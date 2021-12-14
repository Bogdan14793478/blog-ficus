/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { createNewCommit, deleteCommit } from "../../../api/posts"
import { FormCreateComment } from "./FormCreateComent"
import { GeneralList } from "./GeneralList"
import { findById, parseJwt } from "../../../utils/helpers"

type ObjectComments = {
  _id: string
  children: null | ObjectComments[] // ???
  commentedBy: string
  dateCreated: string
  followedCommentID: null | string
  likes: null | [string] // ????
  postID: string
  text: string
  __v: number
}

type PropsType = {
  comments: ObjectComments[]
  postID: string
}
export const GeneralLogic: React.FC<PropsType> = ({ comments, postID }) => {
  const [message, setMessage] = useState([])

  const tokenUser = localStorage.getItem("passport")
  const userId = parseJwt(tokenUser).user._id

  const onSubmit = (values: object, props: any) => {
    const clonededMessage = [...message]
    if (!values.followedCommentID) {
      clonededMessage.push(values)
    } else {
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

  const deleteComment = (comentID: string, parentPostID: string) => {
    let clonededMessage = [...message]
    if (parentPostID) {
      const parentComment = findById(clonededMessage, parentPostID)
      parentComment.children = parentComment.children.filter(
        child => child._id !== comentID
      )
    } else {
      clonededMessage = clonededMessage.filter(mes => mes._id !== comentID)
    }
    setMessage(clonededMessage)
    deleteCommit(comentID)
  }

  const plusOrMinusLike = (itemId: string, postId: string, parentPostID: string) => {
    const clonededMessage = [...message]
    if (parentPostID) {
      const parentComment = findById(clonededMessage, parentPostID)
      parentComment.children = parentComment.children.filter(
        child => child._id === postId
      )
      const foundedLikeComment = parentComment.children[0].likes?.find(
        like => like === itemId
      )
      if (foundedLikeComment) {
        parentComment.children[0].likes = parentComment.children[0].likes?.filter(
          like => like !== itemId
        )
      } else {
        parentComment.children[0].likes.push(itemId)
      }
      setMessage(clonededMessage)
    } else {
      const findIndItem = clonededMessage.findIndex(
        comment => comment._id === postId
      )
      const findComment = clonededMessage[findIndItem]
      const foundedLikeComment = findComment.likes.find(like => like === itemId)
      if (foundedLikeComment) {
        findComment.likes = findComment.likes.filter(like => like !== itemId)
      } else {
        findComment.likes.push(itemId)
      }
      setMessage(clonededMessage)
    }
  }

  useEffect(() => {
    const messages = []
    for (const item of comments) {
      item.children = []
      if (!item.followedCommentID) {
        const filterdMessages = comments.filter(
          filteredItem => item._id === filteredItem.followedCommentID
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
          userId={userId}
          plusOrMinusLike={plusOrMinusLike}
        />
      </div>
      <div style={{ paddingLeft: "60px" }}>
        <FormCreateComment onSubmit={onSubmit} userId={userId} />
      </div>
    </div>
  )
}
