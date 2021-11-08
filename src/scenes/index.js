import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from 'components'
import { SplashScreen, Login, Home } from './scenes'

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
