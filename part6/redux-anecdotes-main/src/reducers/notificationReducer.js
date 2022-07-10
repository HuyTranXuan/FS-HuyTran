import { createSlice } from '@reduxjs/toolkit'
const initialState = { message: 'Welcome Neo!' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state) => state,
    createAnecMessage(state, action) {
      const message = action.payload
      return { message: `You created '${message}'` }
    },
    voteAnecMessage(state, action) {
      const message = action.payload.content
      return { message: `You voted '${message}'` }
    },
    resetMessage() {
      return { message: `` }
    },
  },
})
const notificationReducer = notificationSlice.reducer

export const { createAnecMessage, resetMessage, voteAnecMessage } =
  notificationSlice.actions
export default notificationReducer
