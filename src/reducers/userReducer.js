import { createSlice } from '@reduxjs/toolkit'
import { showError, showNotification } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = {
  name: '',
  token: '',
  username: ''
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
      // return {
      //   name: action.payload.name,
      //   token: action.payload.token,
      //   username: action.payload.username
      // }
    },
    resetUser() {
      return {
        name: '',
        token: '',
        username: ''
      }
    }
  }
})

export const initalizeUser = () => {
  return((dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const retUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(retUser))

      // We can't reflect state on non-component stuff.
      blogService.setToken(retUser.token)
    }
  })
}

export const loginUser = (username, password) => {
  return(async (dispatch) => {
    try {
      const retUser = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(retUser))

      blogService.setToken(retUser.token)
      dispatch(setUser(retUser))
      dispatch(showNotification(`Welcome "${retUser.name}!"`))
    } catch (error) {
      dispatch(showError(error.response.data.error))
    }
  })
}

export const logoutUser = () => {
  return((dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(resetUser())
  })
}

export const { setUser, resetUser } = userReducer.actions
export default userReducer.reducer