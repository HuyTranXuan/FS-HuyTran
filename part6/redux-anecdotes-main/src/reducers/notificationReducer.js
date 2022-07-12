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
    setMessage(state, action) {
      const message = action.payload
      return { message: message }
    },
  },
})
const notificationReducer = notificationSlice.reducer

export const setNotification = (content, delay) => {
  return async (dispatch) => {
    dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(resetMessage())
    }, delay * 1000)
  }
}

export const { createAnecMessage, resetMessage, voteAnecMessage, setMessage } =
  notificationSlice.actions
export default notificationReducer
