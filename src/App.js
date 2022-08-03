import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchAllBlogs } from './reducers/blogsReducer'
import { initalizeUser } from './reducers/userReducer'
import LoginFrom from './components/LoginForm'
import { Blogs, Blog } from './components/Blogs'
import Navbar from './components/Navbar'
import { Users, User } from './components/Users'
import Notification from './components/Notification'
import { fetchAllUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  // useEffect gets executed in the order they're defined in.
  useEffect(() => {
    console.log('User initialization...')
    dispatch(initalizeUser())
  }, [])

  useEffect(() => {
    dispatch(fetchAllBlogs())
  }, [])

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])


  return(
    <div>
      <Notification />
      <Navbar />
      <h1>Bloglist App</h1>
      <Routes>
        <Route path='/' element={<Blogs />}/>
        <Route path='/blogs/:id' element={<Blog />}/>
        <Route path='/users' element={<Users />}/>
        <Route path='/users/:id' element={<User />} />
        <Route path='/login' element={<LoginFrom />}/>
      </Routes>
      <div>
        <em>FullstackOpen 2022 - Bloglist App - HTI Egypt</em>
      </div>
    </div>
  )
}

export default App
