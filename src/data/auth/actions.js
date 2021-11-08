import { createAction } from '@reduxjs/toolkit'

const BASE_PATH = '/auth'
const LOGIN = `${BASE_PATH}/LOGIN`
const LOGOUT = `${BASE_PATH}/LOGOUT`

const login = createAction(LOGIN)
const logout = createAction(LOGOUT)

export {
  BASE_PATH,
  LOGIN,
  LOGOUT,
  login,
  logout,
}
