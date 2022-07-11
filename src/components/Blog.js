import { useState } from 'react'

const Blog = ({blog}) => {
  const [isFull, setIsFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(!isFull) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button type="button" onClick={() => setIsFull(!isFull)}>Show</button>
      </div>  
    )
  }

  return (
    <div style={blogStyle}>
      <ul>
        <li>Title: {blog.title}</li>
        <li>URL: <a href={blog.url}>{blog.url}</a></li>
        <li>Likes: {blog.likes}</li>
        <li>Author: {blog.author}</li>
      </ul>
      <button type="button" onClick={() => setIsFull(!isFull)}>Hide</button>
    </div> 
  )
}

export default Blog