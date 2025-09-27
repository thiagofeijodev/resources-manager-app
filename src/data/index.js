import { configureStore } from '@reduxjs/toolkit'
import { resourceReducer } from './resource'
import { historyReducer } from './history'

export const store = configureStore({
  reducer: {
    resource: resourceReducer,
    history: historyReducer,
  },
})
