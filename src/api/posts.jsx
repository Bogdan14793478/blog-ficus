import { axiosInstance } from "./axios"
import {
  actionGetAllPosts,
  getAllPostFailure,
  actionCreateNewPosts,
  actionErrorCreateNewPosts,
  actionDeletePosts,
  actionErrorDeletePosts,
} from "../redux/actions/types"

export function getAllPosts(skip) {
  return async (dispatch) => {
    axiosInstance
      .get(`posts?skip=${skip}`, {})
      .then((res) => {
        console.log(res.data, "data")
        dispatch(actionGetAllPosts(res.data))
      })
      .catch((err) => {
        dispatch(getAllPostFailure(err.message))
      })
  }
}

export function createNewPost({ title, fullText, description }) {
  return async (dispatch) => {
    axiosInstance
      .post("posts/", {
        title,
        fullText,
        description,
      })
      .then((res) => {
        dispatch(actionCreateNewPosts(res))
      })
      .catch((err) => {
        dispatch(actionErrorCreateNewPosts(err.message))
      })
  }
}

export function deletePost(id) {
  return async (dispatch) => {
    axiosInstance
      .delete(`posts/${id}`, { postId: id })
      .then((res) => {
        dispatch(actionDeletePosts(res.config.postId))
      })
      .catch((err) => {
        dispatch(actionErrorDeletePosts(err.message))
      })
  }
}
