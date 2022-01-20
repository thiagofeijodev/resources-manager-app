import { createReducer } from '@reduxjs/toolkit'
import { loadStorage } from 'functions'
import { include, BASE_PATH } from './actions'

const initialState = () => {
  const storage = loadStorage(BASE_PATH)
  if (storage) return storage

  return { list: [] }
}

const historyReducer = createReducer(initialState(), (builder) => {
  builder
    .addCase(include, (state, action) => {
      const { payload } = action
      const storage = initialState()
      storage.list = [
        ...storage.list,
        payload,
      ]

      localStorage.setItem(BASE_PATH, JSON.stringify(storage))
      return {
        ...state,
        list: storage.list
      }
    })
})

export default historyReducer
