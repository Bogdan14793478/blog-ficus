import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Table } from "./Table"
import { showChoosePostInfo, loadAllCommentsForPost } from "../../../api/posts"
import { AllCommentsForPosts, OnePost } from "../../Authorization/type"
import { GeneralLogic } from "./GeneralLogic"
import "./CommentsPage.css"

export const CommentsPage = () => {
  const [comments, setComments] = useState<Array<AllCommentsForPosts>>([])
  const [findPost, setFindPost] = useState<OnePost | null>(null)
  const { postID } = useParams<{ postID: string }>()
  useEffect(() => {
    async function takeDate() {
      const commentLoad = await loadAllCommentsForPost(postID)
      const choosePost = await showChoosePostInfo(postID)
      setFindPost(choosePost)
      setComments(commentLoad)
    }
    takeDate()
  }, [postID])

  return (
    <div>
      <h6 className="app-wrapper-setting">Comments page</h6>
      <div className="comments-table">
        <Table findPost={findPost} />
        <GeneralLogic comments={comments} postID={postID} />
      </div>
    </div>
  )
}
