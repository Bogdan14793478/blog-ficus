import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { axiosInstance } from "./axios"
import {
  actionCreateNewPosts,
  Action2,
  ActionTypesPost,
  actionSaveImgPost,
  actionGetAllPosts,
  actionTogleIsFetching,
  actionputPostFromDispatch,
  actionSaveImgPostPUT,
} from "../redux/actions/typeActionPost"
import {
  CreateNewPost,
  SAVE_IMG_POSTInt,
  GET_ALL_POSTInt,
  POST_PUTInt,
  SAVE_IMG_POST_PUTInt,
  Photo,
  DataPost,
  PaginGetAll,
  GetAllPostsRegisterArgs,
  CreateNewCommit,
  AllGetAllPosts,
  AllCommentsForPosts,
  CommentForComment,
  OnePost,
} from "../redux/actions/interface"

export function putLikePost(numberPost: string) {
  axiosInstance.put<never, never>(`posts/like/${numberPost}`)
}

type UpdatePostRegisterResponse = AxiosResponse<Photo>

export function updatePost(rest: DataPost, file?: File, numberPost?: string) {
  const formData = new FormData()
  if (file) {
    formData.append("image", file)
  }
  return async (
    dispatch: Dispatch<
      Action2<
        ActionTypesPost.POST_PUT | ActionTypesPost.SAVE_IMG_POST_PUT,
        POST_PUTInt | SAVE_IMG_POST_PUTInt
      >
    >
  ) => {
    axiosInstance
      .patch<DataPost, UpdatePostRegisterResponse>(`posts/${numberPost}`, rest)
      .then(() => {
        dispatch(actionputPostFromDispatch({ rest, numberPost }))
      })
    if (file) {
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
          const { data } = res
          dispatch(actionSaveImgPostPUT({ res: data, numberPost }))
        })
    }
  }
}

type GetAllPostsRegisterResponse = AxiosResponse<{
  data: AllGetAllPosts[]
  pagination: PaginGetAll
}>
export function getAllPosts(
  skip: string,
  numberId?: null | string,
  searchPosts?: string
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
  return async (
    dispatch: Dispatch<
      Action2<
        ActionTypesPost.TOGLE_IS_FETCHING | ActionTypesPost.GET_ALL_POST,
        boolean | GET_ALL_POSTInt
      >
    >
  ) => {
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
export function createNewPost(rest: DataPost, file?: File) {
  return async (
    dispatch: Dispatch<
      Action2<
        ActionTypesPost.CREATE_NEW_POST | ActionTypesPost.SAVE_IMG_POST,
        CreateNewPost | SAVE_IMG_POSTInt
      >
    >
  ) => {
    const formData = new FormData()
    if (file) {
      formData.append("image", file)
    }
    const postResponse = await axiosInstance.post<
      DataPost,
      CreateNewPostRegisterResponse
    >("posts", rest)
    dispatch(actionCreateNewPosts(postResponse.data))
    if (file) {
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

export function deletePost(postId: string) {
  axiosInstance.delete<never, never>(`posts/${postId}`)
}

type ShowChoosePostInfoRegisterResponse = AxiosResponse<OnePost>
export async function showChoosePostInfo(postId: string) {
  const postResponse = await axiosInstance.get<
    never,
    ShowChoosePostInfoRegisterResponse
  >(`posts/${postId}`)
  return postResponse.data
}

type LoadAllCommentsForPostRegisterResponse = AxiosResponse<
  Array<AllCommentsForPosts>
>
export async function loadAllCommentsForPost(postId: string) {
  const allComment = await axiosInstance.get<
    never,
    LoadAllCommentsForPostRegisterResponse
  >(`comments/post/${postId}`)
  return allComment.data
}

export function putLikeCommit(userID: string) {
  axiosInstance.put<never, never>(`comments/like/${userID}`)
}

type CreateNewCommitRegisterResponse = AxiosResponse<CommentForComment>
export function createNewCommit(data: CreateNewCommit, postID: string) {
  return axiosInstance
    .post<CreateNewCommit, CreateNewCommitRegisterResponse>(
      `comments/post/${postID}`,
      data
    )
    .then(resp => {
      return resp.data
    })
}

export function deleteCommit(commentId: string) {
  axiosInstance.delete<never, never>(`comments/${commentId}`)
}

interface TextInt {
  text: string
}
export function updateCommit(commentId: string | null, text: TextInt) {
  axiosInstance.patch<TextInt, never>(`comments/${commentId}`, text)
}
