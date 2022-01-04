/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useContext } from "react"
import { FormikHelpers } from "formik"
import {
  createNewCommit,
  deleteCommit,
  // , updateCommit
} from "../../../api/posts"
import { FormCreateComment } from "./FormCreateComent"
import { GeneralList } from "./GeneralList"
import { findById, parseJwt, getFromStorage } from "../../../utils/helpers"
import { ObjectComment } from "../../../redux/actions/interface"
import { ModalContext } from "../../../context"

type PropsType = {
  comments: ObjectComment[]
  postID: string
}
export const GeneralLogic: React.FC<PropsType> = ({ comments, postID }) => {
  const [message, setMessage] = useState<Array<ObjectComment>>([])

  const { handleClickCloseModal } = useContext(ModalContext)
  const tokenUser = getFromStorage("passport")
  const userId: string = parseJwt(tokenUser).user._id

  async function onSubmit(
    values: ObjectComment,
    props: FormikHelpers<ObjectComment>
  ) {
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
    values._id = dataReg?._id
    setMessage(clonededMessage)
    props.resetForm()
  }

  async function updateComment(
    values: ObjectComment,
    props: FormikHelpers<ObjectComment>
  ) {
    const clonededMessage: ObjectComment[] = [...message]
    const postId = values.followedCommentID
    const desiredCommit = findById(clonededMessage, postId)
    const findIndx = clonededMessage.findIndex(comment => comment._id === postId)
    desiredCommit.text = values.text
    clonededMessage[findIndx] = desiredCommit
    setMessage(clonededMessage)
    // updateCommit(postId, desiredCommit.text)   как передавая Id поста без Id комента обновить??
    props.resetForm()
    handleClickCloseModal()
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
          updateComment={(values, props) => updateComment(values, props)}
          deleteComment={deleteComment}
          userId={userId}
          plusOrMinusLike={plusOrMinusLike}
          postID={postID}
        />
      </div>
      <div style={{ paddingLeft: "60px" }}>
        <FormCreateComment
          onSubmitPost={(values, props) => onSubmit(values, props)}
          userId={userId}
          followedCommentID={null}
        />
      </div>
    </div>
  )
}
