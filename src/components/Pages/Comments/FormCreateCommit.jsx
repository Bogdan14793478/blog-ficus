/* eslint-disable no-restricted-syntax */
import React, { useState, useContext } from "react"
import { useDispatch } from "react-redux"
import { Form, Formik, FieldArray } from "formik"
import * as Yup from "yup"
import { Fab, TextField } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Errors } from "../../Authorization/Errors"
import { ErrorMsg } from "../../../constantsName/constants"
import { ModalContext } from "../../../context"
import { createNewCommit } from "../../../api/posts"

const validationSchema = Yup.object().shape({
  text: Yup.string().min(4, ErrorMsg.roolMinTitle).required(ErrorMsg.resultRequired),
})

export const FormCreateCommit = ({ followedCommentID, comments, userId, page }) => {
  const [comit, setComit] = useState([...comments])
  const [uniqueId, setUniqueId] = useState(1)

  const initialValues = {
    text: "",
    children: [],
    parentId: null,
    userId,
    id: uniqueId,
  }

  const findById = (data, id) => {
    console.log(data, "data")
    for (const element of data) {
      if (element._id === id) {
        return element
      }
      if (element.children) {
        const desiredElement = findById(element.children, id)
        if (desiredElement) {
          return desiredElement
        }
      }
    }
    return false
  }

  const onSubmit = (values, props) => {
    const clonetedCommit = [...comit]
    console.log(clonetedCommit, "cloned comit neef f all comm")
    if (
      typeof followedCommentID === "object" ||
      typeof followedCommentID === "undefined"
    ) {
      clonetedCommit.push(values)
      console.log(clonetedCommit, "clonetedCommit")
    }
    // } else {
    //   const desiredCommit = findById(clonetedCommit, followedCommentID)
    //   // eslint-disable-next-line no-param-reassign
    //   values.parentId = followedCommentID
    //   desiredCommit.children.push(values)
    // }
    const { text } = values
    const postID = page
    const data = { text, followedCommentID }
    createNewCommit(data, postID)

    setComit(clonetedCommit)
    setUniqueId(uniqueId + 1)
    props.resetForm()
  }

  // const onSubmit = (values, numderId, props) => {
  //   const data = { ...values, followedCommentID }
  //   createNewCommit(data, numderId)
  //   props.resetForm()
  // }

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
