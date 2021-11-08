import { createReducer } from '@reduxjs/toolkit'
import { sign } from 'jsonwebtoken'
import { login, logout, BASE_PATH } from './actions'
import { loadStorage } from 'functions'

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
        user['username'] = username
        user['hash'] = hash

        const _state = { users, user: user }
        localStorage.setItem(BASE_PATH, JSON.stringify(_state))
        state.user = user
      }
      
      state.errors = { isInvalid: true }
    })
    .addCase(logout, (state, _) => {
      const auth = {
        ...loadStorage(BASE_PATH),
        user: null
      }
      localStorage.setItem(BASE_PATH, JSON.stringify(auth))
      state.user = null
      state.errors = null
    })
})

export default authReducer
