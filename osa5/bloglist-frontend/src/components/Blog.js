import React, { useState } from 'react'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [view, setView] = useState(false)

  const handleView = () => {
    setView(!view)
  }

  return (
    <div style={blogStyle}>
      {view === false ?
        <p>{props.blog.title} {props.blog.author}</p>
        :
        <div>
          <p>{props.blog.title} {props.blog.author}</p>
          <p>{props.blog.url}</p>
          <div>
            {props.blog.likes}
            <button onClick={props.handleLike}>like</button>

          </div>
          <p>{props.blog.user.name}</p>
          {props.blog.user.name === props.user.name ?
            <button onClick={props.handleRemove}>remove</button>
            : null
          }
        </div>
      }
      <button onClick={handleView}>view</button>
    </div>
  )
}

export default Blog