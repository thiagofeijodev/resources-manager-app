import React from 'react'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'baseui/modal'
import { Input } from 'baseui/input'
import { Select } from 'baseui/select'
import { FormControl } from 'baseui/form-control'
import { KIND as ButtonKind, Button } from 'baseui/button'
import { selectUsername } from 'data/auth'
import { selectResource, change } from 'data/resource'
import { include } from 'data/history'

export default function ViewerHistory({ item, onClose }) {
  const username = useSelector(selectUsername)
  const resources = useSelector(selectResource)
  const dispatch = useDispatch()

  const isEdit = Object.keys(item || {}).length > 0
  const initialValues = isEdit
    ? item
    : { resource: [], amount: 0 }

  const onSubmit = (values, { setSubmitting }) => {
    const resourceId = values.resource.map(({ id }) => id).join()
    const submitData = {
      id: (new Date()).toISOString(),
      username,
      resourceId,
      ...values,
    }

    dispatch(include(submitData))
    dispatch(change(submitData))
    setSubmitting(false)
    onClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {}
        if (!values.resource) errors.resource = 'Required'
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
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader>{isEdit ? "View" : "New"}</ModalHeader>
          <ModalBody>
            <FormControl label="Resouce">
              <Select
                options={Object.values(resources)}
                placeholder="Select resource"
                name="resource"
                labelKey="name"
                valueKey="id"
                onChange={({ value }) => setFieldValue('resource', value)
                }
                error={errors.resource && touched.resource && errors.resource}
                onBlur={handleBlur}
                value={values.resource}
                disabled={isEdit}
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
              type="button"
              kind={ButtonKind.tertiary}
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={onClose}
            >
              Cancel
            </Button>
            {!isEdit && (
              <Button
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                onClick={handleSubmit}
              >
                Save
              </Button>
            )}
          </ModalFooter>
        </form>
      )}
    </Formik>
  )
}
