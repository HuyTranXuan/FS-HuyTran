import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /**
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecToChange = state.find((n) => n.id === id)
      const changedAnec = {
        ...anecToChange,
        votes: Number(anecToChange.votes) + 1,
      }
      return state.map((anec) => (anec.id !== id ? anec : changedAnec))
    },
     */

    updateAnec(state, action) {
      const anecToChange = action.payload
      return state.map((anec) =>
        anec.id === anecToChange.id ? anecToChange : anec
      )
    },
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnecs(state, action) {
      return action.payload
    },
  },
})
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecs(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdotesService.createNew(content)
    dispatch(appendAnec(newAnec))
  }
}

export const vote = (content) => {
  return async (dispatch) => {
    const anecs = await anecdotesService.getAll()
    const anecToChange = anecs.find((n) => n.id === content)
    const changedAnec = {
      ...anecToChange,
      votes: Number(anecToChange.votes) + 1,
    }
    await anecdotesService.update(changedAnec)
    dispatch(updateAnec(changedAnec))
  }
}

export const { appendAnec, setAnecs, updateAnec } = anecSlice.actions
export default anecSlice.reducer

/**
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]
const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}
const initialState = anecdotesAtStart.map(asObject)

      const content = action.payload
      state.push({
        content,
        votes: 0,
        id: getId(),
      })
 */
