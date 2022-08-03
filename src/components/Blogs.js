import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, putLike, createBlog, fetchBlogDetails, postComment } from '../reducers/blogsReducer'
import { Link, useParams, useNavigate } from 'react-router-dom'

const Blogs = () => {
  return(
    <>
      <h2>Blogs</h2>
      <BlogForm />
      <BlogList />
    </>
  )
}

const BlogList = () => {
  const blogList = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <>
      <ul>
        {blogList.map((blog) => (
          <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
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
    <div className="blogs">
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        Likes: {blog.likes}
        <button className="like-button" type="button" onClick={() => handleLike()}>
          like
        </button>
      </p>

      <button type="button" onClick={() => handleDelete()} style={deleteButtonStyle}>
        Delete
      </button>
      <p>Added by {blog.user.username}</p>
      <h3>Comments: </h3>
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
    </div>
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
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            Title
            <input
              type="text"
              value={blogTitle}
              name="BlogTitle"
              placeholder="Enter blog title here..."
              id="blogTitle"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              value={blogAuthor}
              name="BlogAuthor"
              placeholder="Enter blog author here..."
              id="blogAuthor"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            URL
            <input
              type="text"
              value={blogUrl}
              name="BlogUrl"
              placeholder="Enter blog URL here..."
              id="blogUrl"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <button id="create-blog-button" type="submit">
            Create
          </button>
          <button type='button' onClick={() => setIsVisible(!isVisible)}>
            Hide Form
          </button>
        </form>
      </div>
    )

  return(
    <button type='button' onClick={() => setIsVisible(!isVisible)}>Submit Blog</button>
  )
}


export { Blogs, Blog }