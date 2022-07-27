import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, putLike } from '../reducers/blogsReducer'

const BlogList = () => {
  console.log('blogList re-render')
  const blogList = useSelector(state => state.blogs)
  const userName = useSelector(state => state.user.username)
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(putLike(likedBlog))
  }

  const handleDelete = (blog) => {
    const ans = window.confirm(`Sure about deleting "${blog.title}?"`)
    if (ans === true) {
      dispatch(deleteBlog(blog))
    }
  }

  return(
    <>
      {blogList.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          userName={userName}
        />
      ))}
    </>
  )
}

const Blog = ({ blog, handleLike, handleDelete, userName }) => {
  const [isFull, setIsFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteButtonStyle = {
    display: userName === blog.user.username ? '' : 'none',
  }

  if (!isFull) {
    return (
      <div className="blogs" style={blogStyle}>
        {blog.title} {blog.author}
        <button type="button" onClick={() => setIsFull(!isFull)}>
          Show
        </button>
      </div>
    )
  }

  return (
    <div className="blogs" style={blogStyle}>
      <ul>
        <li>Title: {blog.title}</li>
        <li>
          URL: <a href={blog.url}>{blog.url}</a>
        </li>
        <li>
          Likes: {blog.likes}{' '}
          <button className="like-button" type="button" onClick={() => handleLike(blog)}>
            like
          </button>
        </li>
        <li>Author: {blog.author}</li>
      </ul>
      <button type="button" onClick={() => setIsFull(!isFull)}>
        Hide
      </button>
      <button type="button" onClick={() => handleDelete(blog)} style={deleteButtonStyle}>
        Delete
      </button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}

export default BlogList
