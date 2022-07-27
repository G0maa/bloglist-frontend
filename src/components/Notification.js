import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationObj = useSelector(state => state.notification )

  if (notificationObj.message === '') return null

  // Probably not the best way to implement an error notification,
  // but I was lazy.
  const notificationStyle = {
    color: notificationObj.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {notificationObj.message}
    </div>
  )
}

export default Notification
