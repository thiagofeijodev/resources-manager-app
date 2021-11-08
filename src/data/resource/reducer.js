import { createReducer } from '@reduxjs/toolkit'
import { include, change, BASE_PATH } from './actions'
import { loadStorage } from 'functions'

const initialState = () => {
  const storage = loadStorage(BASE_PATH)
  if (storage) return storage

  return { resources: {} }
}

const resourceReducer = createReducer(initialState(), (builder) => {
  builder
    .addCase(include, (state, action) => {
      const { payload } = action
      const { resources } = initialState()
      resources[payload['id']] = payload

      localStorage.setItem(BASE_PATH, JSON.stringify({ resources }))
      state.resources = resources
    })
    .addCase(change, (state, action) => {
      const { payload } = action
      const { resources } = initialState()
      const resource = resources[payload['resourceId']]

      resource.amount = resource.amount + payload.amount

      localStorage.setItem(BASE_PATH, JSON.stringify({ resources }))
      state.resources = resources
    })
})

export default resourceReducer
