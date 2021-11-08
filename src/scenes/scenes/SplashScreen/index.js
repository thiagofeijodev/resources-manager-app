import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAuth } from 'data/auth'

export default function SplashScreen() {
  const auth = useSelector(selectAuth)

  if (auth)
    return <Navigate to="/home" />

  return <Navigate to="/login" />
}
