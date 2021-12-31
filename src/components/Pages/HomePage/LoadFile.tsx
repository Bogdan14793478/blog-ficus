import React from "react"
import { FieldArray, useFormikContext } from "formik"

export const LoadFile = () => {
  const useForm = useFormikContext()
  const loadNewFile = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      useForm.setFieldValue("file", event.currentTarget.files[0])
    }
  }

  return (
    <FieldArray
      name="file"
      render={() => (
        <p>
          <input
            accept="image/*"
            id="icon-button-photo"
            onChange={loadNewFile}
            type="file"
            name="file"
          />
        </p>
      )}
    />
  )
}
