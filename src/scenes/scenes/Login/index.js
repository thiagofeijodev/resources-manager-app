import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Notification, KIND } from 'baseui/notification'
import { selectAuth, selectError, login } from 'data/auth'
import { RestoreBackup } from 'components'
import { Form, Container } from './components'

export default function Login() {
  const auth = useSelector(selectAuth)
  const error = useSelector(selectError)
  const dispatch = useDispatch()

  const onSubmit = (values, { setSubmitting }) => {
    dispatch(login(values))
    setSubmitting(false)
  }

  if (auth)
    return <Navigate to="/home" />

  return (
    <Container>
      <h1>Resources manager</h1>

      <Form onSubmit={onSubmit} />

      <br/>

      {error && error.isInvalid && (
        <Notification
          kind={KIND.negative}
          overrides={{
            Body: {
              style: {
                width: 'auto'
              }
            }
          }}
        >
          Invalid password
        </Notification>
      )}

      <RestoreBackup />
    </Container>
  )
}
