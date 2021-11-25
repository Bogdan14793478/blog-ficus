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
