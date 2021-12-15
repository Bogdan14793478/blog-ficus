/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { createNewCommit, deleteCommit } from "../../../api/posts"
import { FormCreateComment } from "./FormCreateComent"
import { GeneralList } from "./GeneralList"
import { findById, parseJwt } from "../../../utils/helpers"

type StrValues = {
  commentedBy: string | undefined
  followedCommentID: string | null
  numberPostID: string
  text: string
  _id: string
}

interface ObjectComment extends StrValues {
  children?: ObjectComment[]
  dateCreated?: string
  likes?: null | string[]
  postID?: string
  __v?: number
}

type PropsType = {
  comments: ObjectComment[]
  postID: string
}
export const GeneralLogic: React.FC<PropsType> = ({ comments, postID }) => {
  const [message, setMessage] = useState<Array<ObjectComment>>([])

  const tokenUser: string | null = localStorage.getItem("passport")
  const userId: string = parseJwt(tokenUser).user._id

  const onSubmit = (values: StrValues, props: any) => {
    const clonededMessage: ObjectComment[] = [...message]
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

  const deleteComment = (postId: string, followedCommentId: string | null) => {
    let clonededMessage = [...message]
    if (followedCommentId) {
      const parentComment: ObjectComment = findById(
        clonededMessage,
        followedCommentId
      )
      parentComment.children = parentComment.children?.filter(
        child => child._id !== postId
      )
    } else {
      clonededMessage = clonededMessage.filter(mes => mes._id !== postId)
    }
    setMessage(clonededMessage)
    deleteCommit(postId)
  }

  const plusOrMinusLike = (
    commentedBy: string | undefined,
    itemId: string,
    followedCommentId: string | null
  ) => {
    const clonededMessage = [...message]
    if (followedCommentId) {
      const parentComment = findById(clonededMessage, followedCommentId)
      parentComment.children = parentComment.children.filter(
        (child: ObjectComment) => child._id === itemId
      )
      const foundedLikeComment = parentComment.children[0].likes?.find(
        (like: string[] | undefined) => like === commentedBy
      )
      if (foundedLikeComment) {
        parentComment.children[0].likes = parentComment.children[0].likes?.filter(
          (like: string[] | undefined) => like !== commentedBy
        )
      } else {
        parentComment.children[0].likes.push(commentedBy)
      }
      setMessage(clonededMessage)
    } else {
      const findIndItem = clonededMessage.findIndex(
        (comment: ObjectComment) => comment._id === itemId
      )
      const findComment = clonededMessage[findIndItem]
      const foundedLikeComment = findComment.likes?.find(
        like => like === commentedBy
      )
      if (foundedLikeComment) {
        findComment.likes = findComment.likes?.filter(like => like !== commentedBy)
      } else if (commentedBy) {
        findComment.likes?.push(commentedBy)
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
        <FormCreateComment
          onSubmit={onSubmit}
          userId={userId}
          commentId=""
          followedCommentID={null}
        />
      </div>
    </div>
  )
}
