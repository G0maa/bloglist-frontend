import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [notificationObj, setNotificationObj] = useState(null)

  // Can be improved thorugh higher-order-functions, no?
  const showError = (message) => {
    setNotificationObj({
      message,
      error: true,
    })

    setTimeout(() => {
      setNotificationObj(null)
    }, 5000)
  }

  const showNotification = (message) => {
    setNotificationObj({
      message,
      error: false,
    })

    setTimeout(() => {
      setNotificationObj(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const retUser = JSON.parse(loggedInUserJSON)
      setUser(retUser)
      blogService.setToken(retUser.token)
    }
  }, [])

  // This useEffect depends on the one before it being fired,
  // I don't know how react calls use effects, but hope this is more efficient??
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

    try {
      const retUser = await loginService.login({ username, password })
      console.log(retUser)
  
      window.localStorage.setItem('loggedInUser', JSON.stringify(retUser))
  
      blogService.setToken(retUser.token)
      setUser(retUser)
      setUsername('')
      setPassword('')
      showNotification(`Welcome "${retUser.name}!"`)
    } catch (error) {
      console.log(error)
      showError(error.response.data.error)
    }

  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  // There should be try/catch caluse, but I'm just lazy.
  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    try {
      const retBlog = await blogService.postBlog(newBlog)
      console.log(retBlog)
      const retBlogs = await blogService.getAll()
      setBlogs(retBlogs)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      showNotification(`Blog "${blogTitle}" was added successfully`)
    } catch (error) {
      console.log(error)
      showError(error.response.data.error)
    }

  }

  if(user === null) {
    return (
      <div>
        <Notification notificationObj={notificationObj}/>
        <h2>Login to Bloglist Appp</h2>
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
      <Notification notificationObj={notificationObj}/>
      <div>
        <h2>blogs</h2>
        <p>{user.name} is logged in</p>
        <button type="button" onClick={handleLogout}>Logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            Title
            <input
              type="text"
              value={blogTitle}
              name="BlogTitle"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              value={blogAuthor}
              name="BlogAuthor"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              value={blogUrl}
              name="BlogUrl"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button tpye="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default App
