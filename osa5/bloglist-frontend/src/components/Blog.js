import React from "react"

const Blog = (props) => {
    return (
        <div>
            <p>{props.blog.title} {props.blog.author}</p>
        </div>
    )
}

export default Blog