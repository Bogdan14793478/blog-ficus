import { axiosInstance } from "./axios"

import {
  actionGetAllPosts,
  getAllPostFailure,
  actionCreateNewPosts,
  actionErrorCreateNewPosts,
  actionDeletePosts,
  actionErrorDeletePosts,
} from "../redux/actions/types"

export function getAllPosts(skip, numberId) {
  return async (dispatch) => {
    if (numberId) {
      axiosInstance
        .get(`posts?postedBy=${numberId}&skip=${skip}`)
        .then((res) => {
          dispatch(actionGetAllPosts(res.data))
        })
        .catch((err) => {
          dispatch(getAllPostFailure(err.message))
        })
    } else {
      axiosInstance
        .get(`posts?skip=${skip}`)
        .then((res) => {
          dispatch(actionGetAllPosts(res.data))
        })
        .catch((err) => {
          dispatch(getAllPostFailure(err.message))
        })
    }
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
