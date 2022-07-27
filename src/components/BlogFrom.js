import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  // Optional: Group these in a single hook.
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
  }

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
        <button id="create-blog-button" tpye="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
