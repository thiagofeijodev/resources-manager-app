import { createReducer } from '@reduxjs/toolkit'
import { loadStorage } from 'functions'
import { include, change, BASE_PATH } from './actions'

const initialState = () => {
  const storage = loadStorage(BASE_PATH)
  if (storage) return storage

  return {}
}

const resourceReducer = createReducer(initialState(), (builder) => {
  builder
    .addCase(include, (state, action) => {
      const { payload } = action
      const resources = initialState()
      resources[payload.id] = payload

      localStorage.setItem(BASE_PATH, JSON.stringify(resources))
      return resources
    })
    .addCase(change, (state, action) => {
      const { payload } = action
      const resources = initialState()
      
      if (resources[payload.resourceId]) {
        resources[payload.resourceId].amount = resources[payload.resourceId].amount + payload.amount
      }

      localStorage.setItem(BASE_PATH, JSON.stringify(resources))
      return resources
    })
})

export default resourceReducer
