import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Table } from "./Table"
import { showChoosePostInfo, loadAllCommentsForPost } from "../../../api/posts"
import { GeneralLogic } from "./GeneralLogic"
import "./CommentsPage.css"

export const CommentsPage = () => {
  const [comments, setComments] = useState([])
  const [findPost, setFindPost] = useState({})
  const { postID } = useParams()

  useEffect(() => {
    async function takeDate() {
      const commentLoad = await loadAllCommentsForPost(postID)
      const choosePost = await showChoosePostInfo(postID)
      setFindPost(choosePost.data)
      setComments(commentLoad.data)
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
