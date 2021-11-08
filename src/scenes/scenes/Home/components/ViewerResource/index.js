import React from 'react'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsername } from 'data/auth'
import { include } from 'data/resource'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'baseui/modal'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import { KIND as ButtonKind, Button } from 'baseui/button'

export default function ViewerResource({ item, onClose }) {
  const username = useSelector(selectUsername)
  const dispatch = useDispatch()

  const isEdit = Object.keys(item || {}).length > 0
  const initialValues = isEdit
    ? item
    : { name: '', amount: '' }

  const onSubmit = (values, { setSubmitting }) => {
    const submitData = {
      id: (new Date()).toISOString(),
      username,
      ...values,
    }

    dispatch(include(submitData))
    setSubmitting(false)
    onClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {}
        if (!values.name) errors.name = 'Required'
        if (!values.amount) errors.amount = 'Required'

        return errors
      }}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader>{isEdit ? "View" : "New"}</ModalHeader>
          <ModalBody>
            <FormControl label="Name">
              <Input
                type="text"
                name="name"
                error={errors.name && touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </FormControl>
            <FormControl label="Amount">
              <Input
                type="number"
                name="amount"
                error={errors.amount && touched.amount && errors.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                disabled={isEdit}
              />
            </FormControl>

            {isEdit && (
              <>
                <FormControl label="Created by">
                  <Input
                    type="text"
                    name="username"
                    value={values.username}
                    disabled={isEdit}
                  />
                </FormControl>

                <FormControl label="Created at">
                  <Input
                    type="text"
                    name="id"
                    value={(new Date(values.id)).toLocaleString()}
                    disabled={isEdit}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              kind={ButtonKind.tertiary}
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      )}
    </Formik>
  )
}
