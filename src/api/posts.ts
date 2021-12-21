import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { axiosInstance } from "./axios"
import {
  actionGetAllPosts,
  actionCreateNewPosts,
  actionputPostFromDispatch,
  actionSaveImgPost,
  actionSaveImgPostPUT,
  actionTogleIsFetching,
  Photo,
  CreateNewPost,
  POST_PUT,
  Action,
  SAVE_IMG_POST_PUT,
  GET_ALL_POST,
  SAVE_IMG_POST,
} from "../redux/actions/types"
import {
  AllGetAllPosts,
  AllCommentsForPosts,
  CommentForComment,
  OnePost,
} from "../components/Authorization/type"

type putLikePostRegisterArgs = { numberPost: string }
type OnSubmitRegisterResponse = AxiosResponse<{}>
export function putLikePost(numberPost: string) {
  axiosInstance.put<putLikePostRegisterArgs, OnSubmitRegisterResponse>(
    `posts/like/${numberPost}`
  )
}

interface DataPost {
  description: string
  fullText: string
  title: string
}

export type UpdatePostRegisterArgs = {
  description: string
  fullText: string
  title: string
}
type UpdatePostRegisterResponse = AxiosResponse<Photo>

export function updatePost(data: DataPost, photoFile: File, numberPost: string) {
  const formData = new FormData()
  formData.append("image", photoFile)
  return async (dispatch: Dispatch<Action<POST_PUT | SAVE_IMG_POST_PUT>>) => {
    axiosInstance
      .patch<UpdatePostRegisterArgs, UpdatePostRegisterResponse>(
        `posts/${numberPost}`,
        data
      )
      .then(() => {
        dispatch(actionputPostFromDispatch({ data, numberPost }))
      })
    if (photoFile) {
      axiosInstance
        .put<FormData, UpdatePostRegisterResponse>(
          `posts/upload/${numberPost}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(res => {
          const { data: payload } = res
          dispatch(actionSaveImgPostPUT({ res: payload, numberPost }))
        })
    }
  }
}

type GetAllPostsRegisterArgs = {
  skip: string
  numberId?: null | string
  searchPosts?: string
}

export interface PaginationGetAllPost {
  skip: number
  limit: number
  total: number
}
type GetAllPostsRegisterResponse = AxiosResponse<{
  data: AllGetAllPosts[]
  pagination: PaginationGetAllPost
}>
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
  return async (dispatch: Dispatch<Action<boolean | GET_ALL_POST>>) => {
    dispatch(actionTogleIsFetching(true))
    axiosInstance
      .get<GetAllPostsRegisterArgs, GetAllPostsRegisterResponse>(url)
      .then(res => {
        const { data: payload, pagination } = res.data
        dispatch(actionTogleIsFetching(false))
        dispatch(actionGetAllPosts({ payload, pagination }))
      })
  }
}

type CreateNewPostRegisterResponse = AxiosResponse<CreateNewPost>
export function createNewPost(data: DataPost, photoFile: File) {
  return async (dispatch: Dispatch<Action<CreateNewPost | SAVE_IMG_POST>>) => {
    const formData = new FormData()
    formData.append("image", photoFile)
    const postResponse = await axiosInstance.post<
      UpdatePostRegisterArgs,
      CreateNewPostRegisterResponse
    >("posts", data)
    dispatch(actionCreateNewPosts(postResponse.data))
    if (photoFile) {
      const numberPost = postResponse.data._id
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

type DeletePostRegisterArgs = { postId: string }
type DeletePostRegisterResponse = AxiosResponse<{}>
export function deletePost(postId: string) {
  axiosInstance.delete<DeletePostRegisterArgs, DeletePostRegisterResponse>(
    `posts/${postId}`
  )
}

type ShowChoosePostInfoRegisterArgs = { postId: string }
type ShowChoosePostInfoRegisterResponse = AxiosResponse<OnePost>
export async function showChoosePostInfo(postId: string) {
  const postResponse = await axiosInstance.get<
    ShowChoosePostInfoRegisterArgs,
    ShowChoosePostInfoRegisterResponse
  >(`posts/${postId}`)
  return postResponse.data
}

type LoadAllCommentsForPostRegisterArgs = { postId: string }
type LoadAllCommentsForPostRegisterResponse = AxiosResponse<
  Array<AllCommentsForPosts>
>
export async function loadAllCommentsForPost(postId: string) {
  const allComment = await axiosInstance.get<
    LoadAllCommentsForPostRegisterArgs,
    LoadAllCommentsForPostRegisterResponse
  >(`comments/post/${postId}`)
  return allComment.data
}

type PutLikeCommitRegisterArgs = { userID: string }
type PutLikeCommitRegisterResponse = AxiosResponse<{ message: string }>
export function putLikeCommit(userID: string) {
  axiosInstance.put<PutLikeCommitRegisterArgs, PutLikeCommitRegisterResponse>(
    `comments/like/${userID}`
  )
}

interface CreateNewCommit {
  followedCommentID: null | string
  text: string
  _id?: string
}
type CreateNewCommitRegisterArgs = {
  followedCommentID: null | string
  text: string
  _id?: string
  postID?: string
}
type CreateNewCommitRegisterResponse = AxiosResponse<CommentForComment>
export function createNewCommit(data: CreateNewCommit, postID: string) {
  return axiosInstance
    .post<CreateNewCommitRegisterArgs, CreateNewCommitRegisterResponse>(
      `comments/post/${postID}`,
      data
    )
    .then(resp => {
      return resp.data
    })
}

type DeleteCommitRegisterArgs = {
  commentId: string
}
type DeleteCommitRegisterResponse = AxiosResponse<{}>
export function deleteCommit(commentId: string) {
  axiosInstance.delete<DeleteCommitRegisterArgs, DeleteCommitRegisterResponse>(
    `comments/${commentId}`
  )
}
