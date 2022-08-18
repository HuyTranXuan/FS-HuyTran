import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    signIn: (state, action) => {
      blogService.setToken(action.payload.token)
      // state.push(action.payload)
      const user = action.payload
      return { user }
    },
    signOut: () => {
      blogService.setToken('')
      return { user: null }
    },
  },
})
const userReducer = userSlice.reducer

export const logIn = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch(signIn(user))
  }
}
export const logOut = (user) => {
  return async (dispatch) => {
    dispatch(signOut(user))
  }
}
export const getAll = () => {
  return async () => {
    const users = await loginService.getAll()
    return users
  }
}
export const { signIn, signOut } = userSlice.actions
export default userReducer
