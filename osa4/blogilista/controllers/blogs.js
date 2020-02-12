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
            if(blog.title == undefined && blog.url == undefined){
                response.status(400).json(result)    
            }else{
                console.log("blog saved!");
                response.status(201).json(result)
            }
        })
})

module.exports = blogsRouter