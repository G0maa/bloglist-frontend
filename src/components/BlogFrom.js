import PropTypes from 'prop-types'
import { useState } from 'react'


const BlogForm = ({ submitBlog }) => {
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
    submitBlog(newBlog)
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
            placeholder='Enter blog title here...'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            placeholder='Enter blog author here...'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={blogUrl}
            name="BlogUrl"
            placeholder='Enter blog URL here...'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button tpye="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes =  {
  submitBlog: PropTypes.func.isRequired
}
export default BlogForm