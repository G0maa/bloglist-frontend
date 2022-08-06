import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserBlogs } from '../reducers/usersReducer'
import { Link, useParams } from 'react-router-dom'
import { Table, Segment, Header } from 'semantic-ui-react'

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
    <Segment>
      <Header as='h2'>Users</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs count</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersSummary.map((user) =>
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogsCount}</Table.Cell>
            </Table.Row>
          )
          }
        </Table.Body>
      </Table>
    </Segment>
  )
}

const User = () => {
  const dispatch = useDispatch()
  const userId = useParams().id
  useEffect(() => {
    dispatch(fetchUserBlogs(userId))
  }, [])

  const user = useSelector((state) => state.users.find((user) => user.id === userId))

  if(!user){
    return (
      <p>Loading...</p>
    )
  }

  return(
    <>
      <Segment>
        <h2>{ user.name }</h2>
        <h3>Added Blogs: </h3>
        <ul>
          {user.blogs.map((blog) => <li key={blog.id}>{ blog.title }</li>)}
        </ul>
      </Segment>
    </>
  )
}

export { Users, User }