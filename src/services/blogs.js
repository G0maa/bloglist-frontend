import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (givenToken) => {
  token = `bearer ${givenToken}`
}

// Unspecified user, but my implementation still requires token.
const getAll = async () => {
  const response = await axios.get(baseUrl, { headers: {Authorization: token } })
  return response.data
}

export default { getAll, setToken }