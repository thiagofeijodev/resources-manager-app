import { createReducer } from '@reduxjs/toolkit'
import { sign } from 'jsonwebtoken'
import { loadStorage } from 'functions'
import { login, logout, BASE_PATH } from './actions'

const initialState = () => {
  const storage = loadStorage(BASE_PATH)
  if (storage) return storage

  return { user: null, users: null }
}

const authReducer = createReducer(initialState(), (builder) => {
  builder
    .addCase(login, (state, action) => {
      const username = action.payload.username.toLowerCase()
      const password = action.payload.password.toLowerCase()
      const storage = initialState()
      const hash = sign(username.toLowerCase(), password)
      const user = storage.user || {}
      const users = storage.users || {}

      if (!users[username]) {
        users[username] = hash
      }

      if (users[username] && users[username] === hash) {
        user.username = username
        user.hash = hash

        const _state = { users, user }
        localStorage.setItem(BASE_PATH, JSON.stringify(_state))
      }
      
      return {
        ...state,
        user,
        errors: { isInvalid: true }
      }
    })
    .addCase(logout, (state) => {
      const auth = {
        ...loadStorage(BASE_PATH),
        user: null
      }
      localStorage.setItem(BASE_PATH, JSON.stringify(auth))

      return {
        ...state,
        user: null,
        errors: null,
      }
    })
})

export default authReducer
