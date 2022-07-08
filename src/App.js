import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(user !== null) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ) 
    }
    // React complained when I removed `user` from the array.
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    const retUser = await loginService.login({ username, password })
    console.log(retUser)
    blogService.setToken(retUser.token)
    setUser(retUser)
    setUsername('')
    setPassword('')
  }

  if(user === null) {
    return (
      <div>
        <h2>Login to app</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
  
  return (
    <div>

      <h2>blogs</h2>
      <h3>{user.name} is logged in</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
