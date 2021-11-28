import { axiosInstance } from "./axios"
import {
  actionGetAllPosts,
  actionCreateNewPosts,
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
      const firstInquiry = await axiosInstance.post("posts", data)
      if (firstInquiry) {
        dispatch(actionCreateNewPosts(firstInquiry))
      }
      if (photoFile) {
        const numbePost = firstInquiry.data._id
        const responseSecond = await axiosInstance.put(
          `posts/upload/${numbePost}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        dispatch(actionSaveImgPost({ responseSecond, numbePost }))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export function deletePost(postId) {
  axiosInstance.delete(`posts/${postId}`)
}
