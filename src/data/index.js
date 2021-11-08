import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth'
import { resourceReducer } from './resource'
import { historyReducer } from './history'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resource: resourceReducer,
    history: historyReducer,
  },
})
