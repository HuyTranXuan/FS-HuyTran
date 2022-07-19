import { useSelector } from 'react-redux'
const Notification = ({ message }) => {
  const style = {
    color: '#042301',
    fontStyle: 'bold',
    fontSize: 26,
    backgroundColor: '#bdcbdb',
    borderRadius: 5,
    marginLeft: 0,
  }
  const warning = { ...style, backgroundColor: '#ff0036' }
  if (message === null) {
    return null
  }

  const notification = useSelector((state) => state.notification)

  if (
    notification.message.includes('wrong') ||
    notification.message.includes('failed')
  )
    return <div style={warning}>{notification.message}</div>
  else return <div style={style}>{notification.message}</div>
}

export default Notification
