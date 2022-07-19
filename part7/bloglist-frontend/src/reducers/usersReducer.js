import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    appendUser(state, action) {
      state.push(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      const target = action.payload
      return state.filter((user) => user.id !== target.id)
    },
  },
})
const usersReducer = usersSlice.reducer

export const getAll = () => {
  return async (dispatch) => {
    const users = await loginService.getAll()
    dispatch(setUsers(users))
  }
}
export const { appendUser, setUsers, removeUser } = usersSlice.actions
export default usersReducer
