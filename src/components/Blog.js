import { useState } from 'react'

const Blog = ({blog, handleLike}) => {
  const [isFull, setIsFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // A Problem:
  // My implementation in the backend differs from examples solution,
  // not because it's wrong but because I solved the optional excercises (?I think?)
  // A solution:
  // Have a dedicated like function in the backend :)

  const incrementLike = () => {
    const newBlog = {...blog}
    newBlog.likes += 1
    handleLike(newBlog)
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
        <li>Likes: {blog.likes} <button type='button' onClick={incrementLike}>like</button></li>
        <li>Author: {blog.author}</li>
      </ul>
      <button type="button" onClick={() => setIsFull(!isFull)}>Hide</button>
    </div> 
  )
}

export default Blog