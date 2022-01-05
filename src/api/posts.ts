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
  UpdatePostPayload,
  UplaodPostImagePayload,
} from "../redux/actions/typeActionPost"
import {
  Pagination,
  Post,
  Comment,
  UpdatePost,
  CreatePost,
  CreateComment,
  UpdateComment,
} from "../redux/actions/interface"

export function putLikePost(numberPost: string) {
  axiosInstance.put<never, never>(`posts/like/${numberPost}`)
}

export function updatePost(rest: UpdatePost, numberPost: string, file?: File) {
  const formData = new FormData()
  if (file) {
    formData.append("image", file)
  }
  return async (
    dispatch: Dispatch<
      Action2<
        ActionTypesPost.POST_PUT | ActionTypesPost.SAVE_IMG_POST_PUT,
        UpdatePostPayload | UplaodPostImagePayload
      >
    >
  ) => {
    axiosInstance
      .patch<UpdatePost, AxiosResponse<Post>>(`posts/${numberPost}`, rest)
      .then(() => {
        dispatch(actionputPostFromDispatch({ rest, numberPost }))
      })
    if (file) {
      axiosInstance
        .put<FormData, AxiosResponse<Post>>(`posts/upload/${numberPost}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          const { data } = res
          dispatch(actionSaveImgPostPUT({ res: data, numberPost }))
        })
    }
  }
}

type GetAllPostsRegisterArgs = {
  skip: string
  numberId?: null | string
  searchPosts?: string
}
type GetAllPostsRegisterResponse = AxiosResponse<{
  data: Post[]
  pagination: Pagination
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
        | boolean
        | {
            pagination: Pagination
            payload: Post[]
          }
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

type CreateNewPostRegisterResponse = AxiosResponse<Post>
export function createNewPost(rest: CreatePost, file?: File) {
  return async (
    dispatch: Dispatch<
      Action2<
        ActionTypesPost.CREATE_NEW_POST | ActionTypesPost.SAVE_IMG_POST,
        | Post
        | {
            fileUploadResponse: Post
            numberPost: string
          }
      >
    >
  ) => {
    const formData = new FormData()
    if (file) {
      formData.append("image", file)
    }
    const postResponse = await axiosInstance.post<
      CreatePost,
      CreateNewPostRegisterResponse
    >("posts", rest)
    dispatch(actionCreateNewPosts(postResponse.data))

    if (file) {
      const numberPost = postResponse.data._id
      const fileUploadResponse: Post = await axiosInstance.put(
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

// ???
type ShowChoosePostInfoRegisterResponse = AxiosResponse<Post>
export async function showChoosePostInfo(postId: string) {
  const postResponse = await axiosInstance.get<
    never,
    ShowChoosePostInfoRegisterResponse
  >(`posts/${postId}`)
  return postResponse.data
}

type LoadAllCommentsForPostRegisterResponse = AxiosResponse<Array<Comment>>
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

type CreateNewCommitRegisterResponse = AxiosResponse<Comment>
export function createNewCommit(data: CreateComment, postID: string) {
  return axiosInstance
    .post<CreateComment, CreateNewCommitRegisterResponse>(
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

export function updateCommit(commentId: string | null, text: UpdateComment) {
  axiosInstance.patch<UpdateComment, never>(`comments/${commentId}`, text)
}
