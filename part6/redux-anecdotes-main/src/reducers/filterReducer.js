import { createSlice } from '@reduxjs/toolkit'

const initialState = { searchQuerry: '' }

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchFor(state, action) {
      const searchQuerry = action.payload
      return { searchQuerry: searchQuerry }
    },
  },
})
const filterReducer = filterSlice.reducer

export const { searchFor } = filterSlice.actions
export default filterReducer
