import { axiosInstance } from "./axios"
import { Labels } from "../constantsName/constants"

import {
  actionGetAllPosts,
  getAllPostFailure,
  actionCreateNewPosts,
  actionErrorCreateNewPosts,
  actionDeletePosts,
  actionErrorDeletePosts,
  actionpostPlusOrMinusLike,
} from "../redux/actions/types"

export function putLikePost(numberPost, userId, postId) {
  return async (dispatch) => {
    axiosInstance
      .put(`posts/like/${numberPost}`)
      .then((res) => {
        dispatch(actionpostPlusOrMinusLike({ postId, userId }))
      })
      .catch((err) => {
        console.log(err, Labels.postsPageError)
        dispatch(actionErrorCreateNewPosts(err.message))
      })
  }
}

export function updatePost(data, numberPost) {
  return async (dispatch) => {
    axiosInstance
      .patch(`posts/${numberPost}`, data)
      .then((res) => {
        dispatch(actionGetAllPosts(res.data))
      })
      .catch((err) => {
        console.log(err, Labels.postsPageError)
        dispatch(actionErrorCreateNewPosts(err.message))
      })
  }
}

export function getAllPosts(skip, numberId, searchPosts) {
  const params = new URLSearchParams({
    skip,
  })
  if (searchPosts) {
    params.set("search", searchPosts)
  }
  if (numberId) {
    params.set("postedBy", numberId)
  }
  const url = `posts?${params.toString()}`
  return async (dispatch) => {
    axiosInstance
      .get(url)
      .then((res) => {
        dispatch(actionGetAllPosts(res.data))
      })
      .catch((err) => {
        console.log(err, Labels.postsPageError)
        dispatch(getAllPostFailure(err.message))
      })
  }
}

export function createNewPost(data) {
  return async (dispatch) => {
    axiosInstance
      .post("posts", data)
      .then((res) => {
        dispatch(actionCreateNewPosts(res))
      })
      .catch((err) => {
        console.log(err, Labels.postsPageError)
        dispatch(actionErrorCreateNewPosts(err.message))
      })
  }
}

export function deletePost(postId) {
  return async (dispatch) => {
    axiosInstance
      .delete(`posts/${postId}`, { postId })
      .then((res) => {
        dispatch(actionDeletePosts(res.config.postId))
      })
      .catch((err) => {
        console.log(err, Labels.postsPageError)
        dispatch(actionErrorDeletePosts(err.message))
      })
  }
}
