import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Navbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if(user.name === '')
    return (
      <div>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
        <Link to='/login'>Login</Link>
      </div>
    )

  return (
    <div>
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <em>User {user.name} Logged in</em>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}

export default Navbar