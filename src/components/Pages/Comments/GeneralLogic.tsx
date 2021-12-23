/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { createNewCommit, deleteCommit } from "../../../api/posts"
import { FormCreateComment } from "./FormCreateComent"
import { GeneralList } from "./GeneralList"
import { findById, parseJwt, getToStorage } from "../../../utils/helpers"
import { ParamValues, ObjectComment } from "../../Authorization/type"

type PropsType = {
  comments: ObjectComment[]
  postID: string
}
export const GeneralLogic: React.FC<PropsType> = ({ comments, postID }) => {
  const [message, setMessage] = useState<Array<ObjectComment>>([])

  const tokenUser = getToStorage("passport")
  const userId: string = parseJwt(tokenUser).user._id

  async function onSubmit(values: ParamValues, props: any) {
    const clonededMessage: ObjectComment[] = [...message]
    if (!values.followedCommentID) {
      clonededMessage.push(values)
    } else {
      const desiredCommit = findById(clonededMessage, values.numberPostID)
      desiredCommit.children.push(values)
    }
    const dataReg = await createNewCommit(
      { text: values.text, followedCommentID: values.followedCommentID },
      postID
    )
    values._id = dataReg?._id ?? nanoid()
    setMessage(clonededMessage)
    props.resetForm()
  }

  const deleteComment = (postId: string, followedCommentId: string | null): void => {
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
    itemId: string,
    followedCommentId: string | null,
    commentedBy?: string
  ): void => {
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
    const tree = (arr: ObjectComment[]) => {
      const toTree = arr
        .reduce((a: ObjectComment[], c: ObjectComment) => {
          c.children = arr.filter(
            (i: ObjectComment) => i.followedCommentID === c._id
          )
          a.push(c)
          return a
        }, [])
        .filter((i: ObjectComment) => i.followedCommentID == null)
      setMessage(toTree)
    }
    tree(comments)
  }, [comments])

  return (
    <div>
      <div style={{ paddingLeft: "40px" }}>
        <GeneralList
          message={message}
          onSubmit={(values, props) => onSubmit(values, props)}
          deleteComment={deleteComment}
          userId={userId}
          plusOrMinusLike={plusOrMinusLike}
          postID={postID}
        />
      </div>
      <div style={{ paddingLeft: "60px" }}>
        <FormCreateComment
          onSubmit={(values, props) => onSubmit(values, props)}
          userId={userId}
          commentId=""
          followedCommentID={null}
        />
      </div>
    </div>
  )
}
