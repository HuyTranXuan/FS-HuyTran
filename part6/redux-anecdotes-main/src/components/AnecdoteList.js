import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
}
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div style={style} key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  let anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const searchQuerry = filter.searchQuerry
  anecdotes = [...anecdotes]
  return (
    <div>
      <ul>
        {anecdotes
          .sort((a, b) => (Number(a.votes) > Number(b.votes) ? -1 : 1))
          .filter((a) =>
            a.content.toLowerCase().includes(searchQuerry.toLowerCase())
          )
          .map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => {
                dispatch(vote(anecdote.id))
                dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
              }}
            />
          ))}
      </ul>
    </div>
  )
}

export default Anecdotes
