import { createReducer } from '@reduxjs/toolkit'
import { loadStorage } from 'functions'
import { include, change, BASE_PATH } from './actions'

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
      resources[payload.id] = payload

      localStorage.setItem(BASE_PATH, JSON.stringify({ resources }))
      return {
        ...state,
        resources
      }
    })
    .addCase(change, (state, action) => {
      const { payload } = action
      const { resources } = initialState()
      const resource = resources[payload.resourceId]

      const _resource = {
        ...resource,
        amount: resource.amount + payload.amount
      }

      localStorage.setItem(BASE_PATH, JSON.stringify({ _resource }))
      return {
        ...state,
        resource: _resource
      }
    })
})

export default resourceReducer
