import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const object = {
    content,
    votes: 0,
    id: getId(),
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}
const update = async (content) => {
  const response = await axios.put(`${baseUrl}/${content.id}`, content)
  return response.data
}

export default {
  getAll,
  createNew,
  update,
}
