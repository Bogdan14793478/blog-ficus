import { axiosInstance } from "./axios"
import {
  actionGetAllPosts,
  actionCreateNewPosts,
  actionputPostFromDispatch,
  actionSaveImgPost,
  actionSaveImgPostPUT,
  actionTogleIsFetching,
} from "../redux/actions/types.ts"

export function putLikePost(numberPost) {
  axiosInstance.put(`posts/like/${numberPost}`)
}

export function updatePost(data, photoFile, numberPost) {
  const formData = new FormData()
  formData.append("image", photoFile)
  return async dispatch => {
    axiosInstance.patch(`posts/${numberPost}`, data).then(() => {
      dispatch(actionputPostFromDispatch({ data, numberPost }))
    })
    if (photoFile) {
      axiosInstance
        .put(`posts/upload/${numberPost}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          dispatch(actionSaveImgPostPUT({ res, numberPost }))
        })
    }
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
  return async dispatch => {
    dispatch(actionTogleIsFetching(true))
    axiosInstance.get(url).then(res => {
      dispatch(actionTogleIsFetching(false))
      dispatch(actionGetAllPosts(res.data))
    })
  }
}

export function createNewPost(data, photoFile) {
  return async dispatch => {
    const formData = new FormData()
    formData.append("image", photoFile)
    const postResponse = await axiosInstance.post("posts", data)
    if (postResponse) {
      dispatch(actionCreateNewPosts(postResponse))
    }
    if (photoFile) {
      const numberPost = postResponse.data._id
      const fileUploadResponse = await axiosInstance.put(
        `posts/upload/${numberPost}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      dispatch(actionSaveImgPost({ fileUploadResponse, numberPost }))
    }
  }
}

export function deletePost(postId) {
  axiosInstance.delete(`posts/${postId}`)
}

export async function showChoosePostInfo(postId) {
  const postResponse = await axiosInstance.get(`posts/${postId}`)
  return postResponse
}

export async function loadAllCommentsForPost(postId) {
  const allComment = await axiosInstance.get(`comments/post/${postId}`)
  return allComment
}

export function putLikeCommit(userID) {
  axiosInstance.put(`comments/like/${userID}`)
}

export function createNewCommit(data, postID) {
  axiosInstance.post(`comments/post/${postID}`, data)
}

export function deleteCommit(commentId) {
  axiosInstance.delete(`comments/${commentId}`)
}
