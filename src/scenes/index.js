import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import { RequireAuth } from 'components'
import { SplashScreen, Login, Home } from './scenes'

export default function Root() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
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
    </HashRouter>
  )
}
