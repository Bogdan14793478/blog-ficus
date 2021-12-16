import { AxiosResponse } from "axios"
import { axiosInstance } from "./axios"
import {
  actionGetAllPosts,
  actionCreateNewPosts,
  actionputPostFromDispatch,
  actionSaveImgPost,
  actionSaveImgPostPUT,
  actionTogleIsFetching,
} from "../redux/actions/types"
import { ObjectPost } from "../components/Authorization/type"

export function putLikePost(numberPost: string) {
  axiosInstance.put(`posts/like/${numberPost}`)
}

interface DataUpdatePost {
  description: string
  fullText: string
  title: string
}
interface Photo {
  dateCreated: string
  description: string
  fullText: string
  image: string
  likes: string[]
  postedBy: string
  title: string
  __v: 0
  _id: string
}
type UpdatePostRegisterArgs = {
  description: string
  fullText: string
  title: string
}
type UpdatePostRegisterResponse = AxiosResponse<{ res: Photo }>
export function updatePost(
  data: DataUpdatePost,
  photoFile: any,
  numberPost: string
) {
  const formData = new FormData()
  formData.append("image", photoFile)
  return async (dispatch: any) => {
    axiosInstance
      .patch<UpdatePostRegisterArgs, any>(`posts/${numberPost}`, data)
      .then(() => {
        dispatch(actionputPostFromDispatch({ data, numberPost }))
      })
    if (photoFile) {
      axiosInstance
        .put<any, UpdatePostRegisterResponse>(
          `posts/upload/${numberPost}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res: any) => {
          dispatch(actionSaveImgPostPUT({ res, numberPost }))
        })
    }
  }
}

export function getAllPosts(
  skip: string,
  numberId: null | string,
  searchPosts: string
) {
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
  return async (dispatch: any) => {
    dispatch(actionTogleIsFetching(true))
    axiosInstance.get(url).then(res => {
      dispatch(actionTogleIsFetching(false))
      dispatch(actionGetAllPosts(res.data))
    })
  }
}

interface DataCreateNewPost {
  title: string
  fullText: string
  description: string
}

export function createNewPost(data: DataCreateNewPost, photoFile: any) {
  return async (dispatch: any) => {
    const formData = new FormData()
    formData.append("image", photoFile)
    const postResponse = await axiosInstance.post<UpdatePostRegisterArgs, any>(
      "posts",
      data
    )
    if (postResponse) {
      dispatch(actionCreateNewPosts(postResponse))
    }
    if (photoFile) {
      const numberPost: string = postResponse.data._id
      const fileUploadResponse: Photo = await axiosInstance.put(
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

export function deletePost(postId: string) {
  axiosInstance.delete(`posts/${postId}`)
}

interface Geaders {
  contentLength: string
  contentType: string
}
interface PostResponse {
  config: any
  data: ObjectPost
  headers: Geaders
  request: any
  status: number
  statusText: string
}
export async function showChoosePostInfo(postId: string) {
  const postResponse: PostResponse = await axiosInstance.get(`posts/${postId}`)
  return postResponse
}

export async function loadAllCommentsForPost(postId: string) {
  const allComment = await axiosInstance.get(`comments/post/${postId}`)
  return allComment
}

export function putLikeCommit(userID: string) {
  axiosInstance.put(`comments/like/${userID}`)
}

interface CreateNewCommit {
  followedCommentID: null | string
  text: string
}
export function createNewCommit(data: CreateNewCommit, postID: string) {
  axiosInstance.post(`comments/post/${postID}`, data)
}

export function deleteCommit(commentId: string) {
  axiosInstance.delete(`comments/${commentId}`)
}
