import { createSlice } from '@reduxjs/toolkit'
const initialState = { message: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetMessage() {
      return { message: '' }
    },
    setMessage(state, action) {
      const message = action.payload
      return { message: message }
    },
  },
})
const notificationReducer = notificationSlice.reducer

let timeoutID
export const setNotification = (content, delay) => {
  return async (dispatch) => {
    if (timeoutID) clearTimeout(timeoutID)
    dispatch(setMessage(content))
    timeoutID = setTimeout(() => {
      dispatch(resetMessage())
    }, delay * 1000)
  }
}

export const { resetMessage, setMessage } = notificationSlice.actions
export default notificationReducer
