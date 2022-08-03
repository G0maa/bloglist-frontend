import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserBlogs } from '../reducers/usersReducer'
import { Link, useParams } from 'react-router-dom'

const Users = () => {
  const usersSummary = useSelector((state) => state.users) // too much information

  if(usersSummary.length === 0) {
    return(
      <div>
        <p>Users non-existent...</p>
      </div>
    )
  }

  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs count</th>
          </tr>
        </thead>
        <tbody>
          {usersSummary.map((user) =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogCount}</td>
            </tr>
          )
          }
        </tbody>
      </table>
    </div>
  )
}

const User = () => {
  const dispatch = useDispatch()
  const userId = useParams().id
  useEffect(() => {
    dispatch(fetchUserBlogs(userId))
  }, [])

  // destructor operator doesn't work with redux
  const user = useSelector((state) => state.users.find((user) => user.id === userId))

  if(!user){
    return (
      <p>Loading...</p>
    )
  }

  return(
    <>
      <h2>{ user.name }</h2>
      <h3>Added Blogs: </h3>
      <ul>
        {user.blogs.map((blog) => <li key={blog.id}>{ blog.title }</li>)}
      </ul>
    </>
  )
}

export { Users, User }