const Notification = ({ message }) => {
  const notification = {
    color: '#042301',
    fontStyle: 'bold',
    fontSize: 26,
    backgroundColor: '#88fa7e',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    marginLeft: 0,
  }
  const warning = { ...notification, backgroundColor: '#ff0036' }
  if (message === null) {
    return null
  }
  if (message.includes('already') || message.includes('failed'))
    return <div style={warning}>{message}</div>
  else return <div style={notification}>{message}</div>
}

export default Notification
