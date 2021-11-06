import { axiosInstance } from "./axios"
import { removeFromStorage } from "../utils/helpers"

import {
  actionGetAllPosts,
  getAllPostFailure,
  actionCreateNewPosts,
  actionErrorCreateNewPosts,
  actionDeletePosts,
  actionErrorDeletePosts,
} from "../redux/actions/types"

export function updatePost(data, numberPost) {
  return async (dispatch) => {
    axiosInstance
      .patch(`posts/${numberPost}`, data)
      .then((res) => {
        dispatch(actionGetAllPosts(res.data))
      })
      .catch((err) => {
        dispatch(actionErrorCreateNewPosts(err.message))
      })
  }
}

export function getAllPosts(skip, numberId) {
  return async (dispatch) => {
    const searchPosts = localStorage.getItem("paramSearch")
    axiosInstance
      .get(
        `posts?skip=${skip}&${numberId ? `postedBy=${numberId}` : ""}&${
          searchPosts ? `search=${searchPosts}` : ""
        }`
      )
      .then((res) => {
        dispatch(actionGetAllPosts(res.data))
        removeFromStorage("paramSearch")
      })
      .catch((err) => {
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
        dispatch(actionErrorDeletePosts(err.message))
      })
  }
}
