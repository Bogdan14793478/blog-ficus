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

export function updatePost(data, photoFile, numberPost) {
  const formData = new FormData()
  formData.append("image", photoFile)
  return async (dispatch) => {
    axiosInstance.patch(`posts/${numberPost}`, data).then((res) => {
      dispatch(actionputPostFromDispatch({ data, numberPost }))
    })
    axiosInstance
      .put(`posts/upload/${numberPost}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(actionSaveImgPost({ res, numberPost }))
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

export function createNewPost(data, photoFile) {
  // eslint-disable-next-line no-var
  let numberPost = ""
  const formData = new FormData()
  formData.append("image", photoFile)
  return async (dispatch) => {
    await axiosInstance.post("posts", data).then((res) => {
      numberPost = res.data._id
      dispatch(actionCreateNewPosts(res))
    })
    axiosInstance
      .put(`posts/upload/${numberPost}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(actionSaveImgPost({ res, numberPost }))
      })
  }
}

export function deletePost(postId) {
  axiosInstance.delete(`posts/${postId}`)
}
