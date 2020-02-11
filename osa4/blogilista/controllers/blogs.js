const express = require('express')
const blogsRouter = express()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog);

    blog
        .save()
        .then(result => {
            console.log("blog saved!");
            response.status(201).json(result)
        })
})

module.exports = blogsRouter