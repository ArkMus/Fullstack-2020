
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const testData = require('./testData')

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(testData.length)
    })

    test('blogs have parameter id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    test('New blog is added', async () => {
        const oldResponse = await api.get('/api/blogs')

        const newBlog = {
            _id: "5b422bb71b54b676234d17f8",
            title: "Yle",
            author: "Markus",
            url: "http://www.yle.fi",
            likes: 11,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(oldResponse.body.length+1)

    })
    
    test('If likes is not defined, it is setted to zero', async () => {
        const newBlog = {
            _id: "5b422bb71b54b676234d17f8",
            title: "Yle",
            author: "Markus",
            url: "http://www.yle.fi",
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body[6].likes).toBe(0)

    })
    
    test('If fields url and title is not defined, return status 400 Bad request', async () => {
        const newBlog = {
            _id: "5b422bb71b54b676234d17f8",
            author: "Markus",
            likes: 11,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

    })
})

afterAll(() => {
    mongoose.connection.close()
})