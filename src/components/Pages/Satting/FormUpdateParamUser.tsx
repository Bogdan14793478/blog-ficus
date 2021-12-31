/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react"
import { useDispatch } from "react-redux"
import { Form, Formik, FieldArray, FormikHelpers } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg } from "../../../constantsName/constants"
import { ModalContext } from "../../../context"
import { updateInformUser } from "../../../api/usersAxios"
import { UpdatePostRegisterArgsInt } from "../../../redux/actions/interface"

const initialValues = {
  name: "",
  skills: "",
  profession: "",
  details: "",
  file: undefined,
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, ErrorMsg.roolMinTitle).required(ErrorMsg.resultRequired),
  skills: Yup.string()
    .min(4, ErrorMsg.checkShortPassword)
    .required(ErrorMsg.resultRequired),
  profession: Yup.string().required(ErrorMsg.resultRequired),
  details: Yup.string().required(ErrorMsg.resultRequired),
})

interface Props {
  userId?: string
}

export const FormUpdateParamUser: React.FC<Props> = ({ userId }) => {
  const { handleClickCloseModal } = useContext(ModalContext)
  const dispatch = useDispatch()

  const onSubmit = (
    values: UpdatePostRegisterArgsInt,
    actions: FormikHelpers<UpdatePostRegisterArgsInt>
  ) => {
    const { file, ...rest } = values
    dispatch(updateInformUser(rest, file, userId))
    actions.resetForm()
    handleClickCloseModal()
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
              value={values.profession}
              name="profession"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px", paddingBottom: "10px" }}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Enter user details"
              value={values.details}
              name="details"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px", paddingBottom: "10px" }}
              onChange={handleChange}
            />
            <FieldArray
              name="file"
              render={() => (
                <p>
                  <input
                    accept="image/*"
                    id="icon-button-photo"
                    onChange={event => {
                      if (event.currentTarget.files !== null) {
                        setFieldValue("file", event.currentTarget.files[0])
                      }
                    }}
                    type="file"
                    name="file"
                  />
                </p>
              )}
            />
            <img
              id="image-before-load-on-server"
              src={values?.file ? URL.createObjectURL(values.file) : undefined}
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
