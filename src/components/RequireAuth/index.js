import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from 'data/auth'

export default function RequireAuth({ children }) {
  const auth = useSelector(selectAuth)

  if (!auth) {
    return <Navigate to="/login" />
  }

  return children
}
