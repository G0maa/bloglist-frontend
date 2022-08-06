import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, putLike, createBlog, fetchBlogDetails, postComment } from '../reducers/blogsReducer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Header, Grid, Form, Segment, Button, Menu, Label, Icon } from 'semantic-ui-react'

const Blogs = () => {
  return(
    <>
      <Segment>
        <Header as='h2'>
          Blogs list
        </Header>
        <BlogList />
        <BlogForm />
      </Segment>
    </>
  )
}

const BlogList = () => {
  const blogList = useSelector(state => state.blogs)

  return(
    <>
      <Menu vertical>
        {blogList.map((blog) => (
          <Menu.Item key={blog.id} link>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <Label>
              <Icon name='heart'/> {blog.likes}
            </Label>
          </Menu.Item>

        ))}
      </Menu>
    </>
  )
}

const Blog = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const userName = useSelector(state => state.user.username)
  const blog = useSelector(state => state.blogs.find((blogT) => blogT.id === blogId))
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  useEffect(() => {
    if(userName)
      dispatch(fetchBlogDetails(blogId))
  }, [userName])

  if(!blog || !blog.user) {
    return(
      <>
        <p>Loading...</p>
      </>
    )
  }

  const handleLike = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(putLike(likedBlog))
  }

  const handleDelete = () => {
    const ans = window.confirm(`Sure about deleting "${blog.title}?"`)
    if (ans === true) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const handleCommment = (event) => {
    event.preventDefault()
    const newBlog = { ...blog, comments: [...blog.comments, comment] }
    dispatch(postComment(newBlog))
    setComment('')
  }

  const deleteButtonStyle = {
    display: userName === blog.user.username ? '' : 'none',
  }

  return (
    <>
      <Segment className="blogs">
        <Header as='h2' dividing>{blog.title} by {blog.author}</Header>
        <Segment basic>
          <a href={blog.url}>{blog.url}</a>
        </Segment>
        <Button as='div' labelPosition='right' className="like-button" type="button" onClick={() => handleLike()}>
          <Button icon>
            <Icon name='heart' />
            Like
          </Button>
          <Label>
            {blog.likes}
          </Label>
        </Button>

        <Button as='div' labelPosition='right' type="button" onClick={() => handleDelete()} style={deleteButtonStyle}>
          <Button icon>
            <Icon name='delete'/>
          </Button>
          <Label>
            Delete
          </Label>
        </Button>
        <Header size='small'>Added by {blog.user.username}</Header>
      </Segment>
      <Segment>
        <h3>Comments </h3>
        <form onSubmit={handleCommment}>
          <input type='text' value={comment} onChange={({ target }) => setComment(target.value)}/>
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, idx) =>
            <li key={idx}>
              {comment}
            </li>
          )}
        </ul>
      </Segment>
    </>
  )
}

const BlogForm = () => {
  const dispatch = useDispatch()

  // Optional: Group these in a single hook.
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const handleNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    dispatch(createBlog(newBlog))
    setIsVisible(false)
  }
  if(isVisible)
    return (
      <Segment>
        <Grid>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h3'>
              Create new
            </Header>
            <Form onSubmit={handleNewBlog}>
              <Form.Input
                label='Blog title'
                type="text"
                value={blogTitle}
                name="BlogTitle"
                placeholder="Enter blog title here..."
                id="blogTitle"
                onChange={({ target }) => setBlogTitle(target.value)}
              />
              <Form.Input
                label='Blog author'
                type="text"
                value={blogAuthor}
                name="BlogAuthor"
                placeholder="Enter blog author here..."
                id="blogAuthor"
                onChange={({ target }) => setBlogAuthor(target.value)}
              />
              <Form.Input
                label='Blog URL'
                type="text"
                value={blogUrl}
                name="BlogUrl"
                placeholder="Enter blog URL here..."
                id="blogUrl"
                onChange={({ target }) => setBlogUrl(target.value)}
              />
              <Button primary id="create-blog-button" type="submit">
                Create
              </Button>
              <Button secondary type='button' onClick={() => setIsVisible(!isVisible)} >
                Hide Form
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    )

  return(
    <Button color='green' type='button' onClick={() => setIsVisible(!isVisible)}>Submit Blog</Button>
  )
}


export { Blogs, Blog }