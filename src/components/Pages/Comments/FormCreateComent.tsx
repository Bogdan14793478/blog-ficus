/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { ErrorMsg } from "../../../constantsName/constants"
import { Errors } from "../../Authorization/Errors"

const validationSchema = Yup.object().shape({
  text: Yup.string().min(4, ErrorMsg.roolMinTitle).required(ErrorMsg.resultRequired),
})
interface FormValues {
  text: string
  children: string[]
  followedCommentID: string | null
  commentedBy: string
  _id: string
  numberPostID: string
}
type PropsType = {
  onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => void
  commentId: string
  followedCommentID: string | null
  userId: string
}

export const FormCreateComment: React.FC<PropsType> = ({
  onSubmit,
  commentId,
  followedCommentID,
  userId,
}) => {
  const initialValues: FormValues = {
    text: "",
    children: [],
    followedCommentID: followedCommentID || null,
    commentedBy: userId,
    _id: "",
    numberPostID: `${commentId}`,
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
              label="Enter text comment"
              value={values.text}
              name="text"
              variant="standard"
              sx={{ width: "300px", marginLeft: "20px" }}
              onChange={handleChange}
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
