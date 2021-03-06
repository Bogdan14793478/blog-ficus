/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react"
import { useDispatch } from "react-redux"
import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg, maxSizeFile } from "../../../constantsName/constants"
import { ModalContext } from "../../../context"
import { LoadFile } from "./LoadFile"
import { CreatePost, UpdatePost } from "../../../redux/actions/interface"

const initialValues: CreatePost = {
  title: "",
  fullText: "",
  description: "",
  file: undefined,
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, ErrorMsg.roolMinTitle)
    .required(ErrorMsg.resultRequired),
  fullText: Yup.string()
    .min(20, ErrorMsg.checkShortPassword)
    .required(ErrorMsg.resultRequired),
  description: Yup.string().required(ErrorMsg.resultRequired),
  file: Yup.array()
    .of(
      Yup.object()
        .shape({
          file: Yup.mixed()
            .test("fileSize", "Size no more than 10 mb", value => {
              if (!value) {
                return false
              }
              return value.size < maxSizeFile.fileSize
            })
            .required(),
          type: Yup.string()
            .oneOf(
              ["image/jpeg", "image/gif", "application/pdf"],
              "Add file with correct format"
            )
            .required(),
          name: Yup.string().required(),
        })
        .typeError("Add file")
    )
    .nullable(),
})

interface Props {
  onSubmitPost: (rest: CreatePost | UpdatePost, postId?: string, file?: File) => void
  postId?: string
}

export const FormCreatePost: React.FC<Props> = ({ onSubmitPost, postId }) => {
  const { handleClickCloseModal } = useContext(ModalContext)
  const dispatch = useDispatch()

  const onSubmit = (
    values: CreatePost | UpdatePost,
    props: FormikHelpers<CreatePost | UpdatePost>
  ) => {
    // why FormikHelpers<StandartDataPost> = mistake
    const { file, ...rest } = values
    dispatch(onSubmitPost(rest, postId, file))
    props.resetForm()
    handleClickCloseModal()
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, handleChange }) => (
          <Form>
            <TextField
              id="standard-basic"
              label="Enter post title"
              value={values.title}
              name="title"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Enter post fullText"
              value={values.fullText}
              name="fullText"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Enter post description"
              value={values.description}
              name="description"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px", paddingBottom: "10px" }}
              onChange={handleChange}
            />
            <LoadFile />
            <img
              src={values?.file ? URL.createObjectURL(values.file) : undefined}
              id="image-before-load-on-server"
            />

            <Errors errors={errors} />
            <Fab type="submit" color="primary" aria-label="edit">
              <AddCircleIcon
                sx={{
                  fontSize: "big",
                  borderRadius: "100%",
                }}
              />
            </Fab>
          </Form>
        )}
      </Formik>
    </div>
  )
}
