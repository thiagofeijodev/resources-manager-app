import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './data/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
