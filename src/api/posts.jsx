import { axiosInstance } from "./axios"

import {
  actionGetAllPosts,
  actionCreateNewPosts,
  actionDeletePosts,
  actionputPostFromDispatch,
  actionSaveImgPost,
  actionTogleIsFetching,
} from "../redux/actions/types"

export function putLikePost(numberPost) {
  axiosInstance.put(`posts/like/${numberPost}`)
}

export function updatePost(data, numberPost) {
  return async (dispatch) => {
    axiosInstance.patch(`posts/${numberPost}`, data).then((res) => {
      dispatch(actionputPostFromDispatch({ data, numberPost }))
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
    dispatch(actionTogleIsFetching(true))
    axiosInstance.get(url).then((res) => {
      dispatch(actionTogleIsFetching(false))
      dispatch(actionGetAllPosts(res.data))
    })
  }
}

export function createNewPost(data) {
  return async (dispatch) => {
    axiosInstance.post("posts", data).then((res) => {
      dispatch(actionCreateNewPosts(res))
    })
  }
}

export function deletePost(postId) {
  return async (dispatch) => {
    axiosInstance.delete(`posts/${postId}`, { postId }).then((res) => {
      dispatch(actionDeletePosts(res.config.postId))
    })
  }
}

export function saveImagePost(photoFile, postId) {
  const formData = new FormData()
  formData.append("image", photoFile)
  return async (dispatch) => {
    axiosInstance
      .put(`posts/upload/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(actionSaveImgPost({ res, postId }))
      })
  }
}
