import { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogFrom'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBlogs } from './reducers/blogsReducer'
import { initalizeUser, logoutUser } from './reducers/userReducer'
import LoginFrom from './components/LoginForm'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // useEffect gets executed in the order they're defined in.
  useEffect(() => {
    dispatch(initalizeUser())
  }, [])

  useEffect(() => {
    dispatch(fetchAllBlogs())
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if (user.name === '') {
    return (
      <div>
        <Notification />
        <LoginFrom />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in</p>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
        <BlogList />
      </div>
      <BlogForm />
    </div>
  )
}

export default App
