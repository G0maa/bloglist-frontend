import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const LoginFrom = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')

  }

  return(
    <>
      <h2>Login to Bloglist App</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
            Login
        </button>
      </form>
    </>
  )
}

export default LoginFrom