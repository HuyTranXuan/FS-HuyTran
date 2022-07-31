import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ADD_YEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const SetBirthYear = ({ authors }) => {
  const [authorBorn, setAuthorBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [addYear] = useMutation(ADD_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    addYear({
      variables: {
        name: selectedOption.value,
        setBornTo: parseInt(authorBorn),
      },
    })
    setAuthorBorn('')
  }

  return (
    <div>
      <h2>Set BirthYear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authors.map((e) => ({ value: e.name, label: e.name }))}
        />
        <div>
          born
          <input
            value={authorBorn}
            onChange={({ target }) => setAuthorBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  )
}
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const result = useQuery(ALL_AUTHORS) // eslint-disable-line

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div>
        <SetBirthYear authors={authors} />
      </div>
    </div>
  )
}

export default Authors
