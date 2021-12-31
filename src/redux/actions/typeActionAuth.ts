import { User, SAVE_AVATAR_USERINT } from "./interface"

// eslint-disable-next-line no-shadow
export enum ActionTypes {
  INFORM_USER = "INFORM_USER",
  USER_UPDATE_INFORM = "USER_UPDATE_INFORM",
  SAVE_AVATAR_USER = "SAVE_AVATAR_USER",
}

export type Action<T> = { type: `${ActionTypes}`; payload: T }
export type Action2<T, P> = { type: T; payload: P }

export type TakeInformUser = Action2<ActionTypes.INFORM_USER, User>
export const takeInformUser = (payload: User): TakeInformUser => ({
  type: ActionTypes.INFORM_USER,
  payload,
})

export type ActionSaveAvatarUser = Action2<
  ActionTypes.SAVE_AVATAR_USER,
  SAVE_AVATAR_USERINT
>
export const actionSaveUserAvatar = (
  payload: SAVE_AVATAR_USERINT
): ActionSaveAvatarUser => ({
  type: ActionTypes.SAVE_AVATAR_USER,
  payload,
})

export type ActionUserUpdateInform = Action2<ActionTypes.USER_UPDATE_INFORM, User>
export const actionUserUpdateInform = (payload: User): ActionUserUpdateInform => ({
  type: ActionTypes.USER_UPDATE_INFORM,
  payload,
})
