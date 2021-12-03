import { axiosInstance } from "./axios"
import {
  actionGetAllPosts,
  actionCreateNewPosts,
  actionputPostFromDispatch,
  actionSaveImgPost,
  actionTogleIsFetching,
  actionShowChoosePost,
  actionShowAllCommenstForPost,
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
    if (photoFile) {
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
  return async (dispatch) => {
    const formData = new FormData()
    formData.append("image", photoFile)
    try {
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
    } catch (err) {
      console.log(err)
    }
  }
}

export function deletePost(postId) {
  axiosInstance.delete(`posts/${postId}`)
}

export function showChoosePostInfo(postId) {
  return async (dispatch) => {
    try {
      const postResponse = await axiosInstance.get(`posts/${postId}`)

      if (postResponse) {
        dispatch(actionShowChoosePost({ postResponse }))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export function loadAllCommentsForPost(postId) {
  return async (dispatch) => {
    axiosInstance.get(`comments/post/${postId}`).then((res) => {
      dispatch(actionShowAllCommenstForPost({ res }))
    })
  }
}

export function putLikeCommit(userID) {
  axiosInstance.put(`comments/like/${userID}`)
}

export function createNewCommit(data, postID) {
  console.log(data, "dataReq")
  axiosInstance.post(`comments/post/${postID}`, data)
}

export function deleteCommit(commentId) {
  axiosInstance.delete(`comments/${commentId}`)
}
