// import { useDispatch } from 'react-redux'
import { searchFor } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    const content = event.target.value
    // dispatch(searchFor(content))
    // input-field value is in variable event.target.value
    props.searchFor(content)
  }
  const style = {
    marginBottom: 10,
    marginTop: 20,
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
// export default Filter
const mapDispatchToProps = {
  searchFor,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
