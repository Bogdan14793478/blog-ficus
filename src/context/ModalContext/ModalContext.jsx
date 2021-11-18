import { createContext } from "react"

export const ModalContext = createContext({
  handleClickOpenModal: () => {},
  handleClickCloseModal: () => {},
})
