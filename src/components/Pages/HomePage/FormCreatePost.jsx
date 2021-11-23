import React, { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg } from "../../../constantsName/constants"
import { ModalContext } from "../../../context"
// import { handleClickCloseModal } from "../../../context/ModalContext/ModalContextProvider"

const initialValues = {
  title: "",
  fullText: "",
  description: "",
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
  const [avatar, setAvatar] = useState({})
  const { handleClickCloseModal } = useContext(ModalContext)
  const dispatch = useDispatch()

  const onSubmit = (values, props) => {
    dispatch(onSubmitPost(values, avatar, postId))
    props.resetForm()
    handleClickCloseModal()
  }

  const handleCapture = (e) => {
    if (e.target.files.length) {
      setAvatar(e.target.files[0])
    }
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
            <input
              accept="image/*"
              id="icon-button-photo"
              onChange={handleCapture}
              type="file"
            />
            <img src={avatar} alt="green" />
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
