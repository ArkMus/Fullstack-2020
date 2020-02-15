const Blog = require('../models/blog')
const User = require('../models/user')
const testData = require('./testData')

const initialBlogs = testData

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  blogsInDb, initialBlogs, usersInDb
}