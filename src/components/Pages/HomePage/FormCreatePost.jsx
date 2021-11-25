/* eslint-disable react/jsx-curly-brace-presence */
import React, { useContext } from "react"
import { useDispatch } from "react-redux"
import { Form, Formik, FieldArray } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg } from "../../../constantsName/constants"
import { ModalContext } from "../../../context"

const initialValues = {
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
  // file: Yup.array().of(
  //   Yup.object()
  //     .shape({
  //       file: Yup.mixed()
  //         .test("fileSize", "Размер файла больше 10 мб", (value) => {
  //           if (!value) return false
  //           return value.size < 10000
  //         })
  //         .required(),
  //       type: Yup.string()
  //         .oneOf([`multipart/form-data`], "Добавте файл верного формата")
  //         .required(),
  //       name: Yup.string().required(),
  //     })
  //     .typeError("Добавте файл")
  // ),
})

export const FormCreatePost = ({ onSubmitPost, postId }) => {
  const { handleClickCloseModal } = useContext(ModalContext)
  const dispatch = useDispatch()

  const onSubmit = (values, props) => {
    const { file, ...rest } = values
    dispatch(onSubmitPost(rest, file, postId))
    props.resetForm()
    handleClickCloseModal()
  }

  const loadFile = function (event) {
    const output = document.getElementById("image-before-load-on-server")
    output.src = URL.createObjectURL(event?.target?.files[0])
    output.onload = function () {
      URL.revokeObjectURL(output.src)
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, setFieldValue, handleChange }) => (
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
            {console.log("file", values.file)}
            {console.log("fileErrors", values.file)}
            <FieldArray name={`file`}>
              <p>
                <input
                  accept="image/*"
                  id="icon-button-photo"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0])
                    loadFile(event)
                  }}
                  type={`file`}
                  name={`file`}
                />
                {console.log(values.file, "433")}
              </p>
            </FieldArray>
            <img id="image-before-load-on-server" alt="green" />

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
