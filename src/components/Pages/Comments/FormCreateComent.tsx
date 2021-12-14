import React from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg } from "../../../constantsName/constants"

const validationSchema = Yup.object().shape({
  text: Yup.string().min(4, ErrorMsg.roolMinTitle).required(ErrorMsg.resultRequired),
})

// type ObjectComments = {
//   _id: string
//   children: null | ObjectComments[]
//   commentedBy: string
//   dateCreated: string
//   followedCommentID: null | string
//   likes: null | [string]
//   postID: string
//   text: string
//   __v: number
// }
// type InitialValuesTypes = {
//   text: string
//   children: ObjectComments[]
//   followedCommentID: null | string
//   commentedBy: string
//   _id: string
//   numberPostID: string
// }  у меня в формике создан обьект, нужно ли его раскрывать и как? а
// то мне красным все подчеркивает

type PropsType = {
  onSubmit: () => {}
  commentId: string
  followedCommentID: null | string
  userId: string
}
export const FormCreateComment: React.FC<PropsType> = ({
  onSubmit,
  commentId,
  followedCommentID,
  userId,
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          text: "",
          children: [],
          followedCommentID: followedCommentID || null,
          commentedBy: userId,
          _id: "",
          numberPostID: `${commentId}`,
        }}
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
