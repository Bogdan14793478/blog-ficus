/* eslint-disable react/jsx-fragments */
import React, { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg } from "../../../constantsName/constants"
import { ModalContext } from "../../../context"
import { updateInformUser } from "../../../api/usersAxios"

const initialValues = {
  name: "",
  skills: "",
  profession: "",
  details: "",
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, ErrorMsg.roolMinTitle).required(ErrorMsg.resultRequired),
  skills: Yup.string()
    .min(4, ErrorMsg.checkShortPassword)
    .required(ErrorMsg.resultRequired),
  profession: Yup.string().required(ErrorMsg.resultRequired),
  details: Yup.string().required(ErrorMsg.resultRequired),
})

export const FormUpdateParamUser = ({ userId }) => {
  const [avatar, setAvatar] = useState({})
  const { handleClickCloseModal } = useContext(ModalContext)
  const dispatch = useDispatch()

  const onSubmit = (values, props) => {
    dispatch(updateInformUser(values, avatar, userId))
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
              label="Enter name user"
              value={values.name}
              name="name"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Enter user skills"
              value={values.skills}
              name="skills"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Enter user profession"
              value={values.description}
              name="profession"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px", paddingBottom: "10px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Enter user details"
              value={values.description}
              name="details"
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
